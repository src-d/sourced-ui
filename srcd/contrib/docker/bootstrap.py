import os

from flask_appbuilder.security.sqla.models import User
from flask_migrate import upgrade as db_upgrade

from superset import app, conf, db, security_manager
from superset.connectors.connector_registry import ConnectorRegistry
from superset.models import core as models
from superset.models.user_attributes import UserAttribute
from superset.utils import core as utils, dashboard_import_export


def get_or_create_datasource(name, uri, **kwargs):
    dbobj = db.session.query(models.Database).filter_by(
        database_name=name).first()
    if not dbobj:
        dbobj = models.Database(
            database_name=name,
            expose_in_sqllab=True,
            **kwargs)
    dbobj.set_sqlalchemy_uri(uri)
    db.session.add(dbobj)
    db.session.commit()

    return dbobj


def create_datasource_tables(dbobj, schema):
    TBL = ConnectorRegistry.sources['table']
    for table in dbobj.all_table_names_in_schema(schema):
        # table_name should match the one in the datasource for fetch_metadata to work
        if db.session.query(TBL).filter_by(table_name=table).first():
            continue
        if db.session.query(TBL).filter_by(table_name='%s.%s' % (schema, table)).first():
            continue

        # create table with original name and fetch columns
        tbl = TBL(table_name=table)
        tbl.database = dbobj
        db.session.add(tbl)
        db.session.commit()
        tbl.fetch_metadata()

        # rename with prefix and set source
        tbl.table_name = '%s.%s' % (schema, table)
        tbl.sql = 'select * from ' + table
        db.session.add(dbobj)
        db.session.commit()


def set_welcome_dashboard(id, username):
    # Get default user
    user = db.session.query(User).filter_by(username=username).first()

    # Make sure welcome dashboard exists
    dashboard = db.session.query(models.Dashboard).filter_by(id=id).first()

    # Set dashboard as default
    extra_attributes = UserAttribute(
        user_id=user.id,
        welcome_dashboard_id=dashboard.id,
    )
    db.session.add(extra_attributes)
    db.session.commit()


def import_dashboard(path):
    print('Importing dashboard from file %s', path)
    with open(path) as data_stream:
        dashboard_import_export.import_dashboards(db.session, data_stream)


def bootstrap():
    # always run migrations first
    db_upgrade()

    # always gitbase script to update datasource if it was changed in env var
    dbobj = get_or_create_datasource('gitbase', conf.get('GITBASE_DATABASE_URI'),
                                     allow_run_async=True, allow_dml=True)
    create_datasource_tables(dbobj, conf.get('GITBASE_DB'))

    # add metadata data source only in sync mode
    if conf.get('SYNC_MODE'):
        dbobj = get_or_create_datasource(
            'metadata', conf.get('METADATA_DATABASE_URI'))
        create_datasource_tables(dbobj, conf.get('METADATA_DB'))

    # initialize database if empty
    users = [u.username for u in security_manager.get_all_users()]
    if not conf.get('DEFAULT_USERNAME') in users:
        # Create an admin user
        role_admin = security_manager.find_role(
            security_manager.auth_role_admin)
        security_manager.add_user(conf.get('DEFAULT_USERNAME'),
                                  os.environ['ADMIN_FIRST_NAME'],
                                  os.environ['ADMIN_LAST_NAME'],
                                  os.environ['ADMIN_EMAIL'],
                                  role_admin,
                                  os.environ['ADMIN_PASSWORD'])
        # Create default roles and permissions
        utils.get_or_create_main_db()
        security_manager.sync_role_definitions()

        # Add dashboards
        dashboards_root = '/home/superset/dashboards'
        import_dashboard(dashboards_root + '/gitbase/overview.json')
        if conf.get('SYNC_MODE'):
            import_dashboard(dashboards_root + '/metadata/welcome.json')
            import_dashboard(dashboards_root + '/metadata/collaboration.json')
        else:
            import_dashboard(dashboards_root + '/gitbase/welcome.json')

        # set welcome dashboard as a default
        set_welcome_dashboard(conf.get('DEFAULT_DASHBOARD_ID'),
                              conf.get('DEFAULT_USERNAME'))


if __name__ == '__main__':
    with app.app_context():
        bootstrap()
