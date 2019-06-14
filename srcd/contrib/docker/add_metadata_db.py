from superset import conf, db
from superset.connectors.connector_registry import ConnectorRegistry
from superset.models import core as models


def get_or_create_metadata_db():
    database_name = 'metadata'

    dbobj = db.session.query(models.Database).filter_by(
        database_name=database_name).first()
    if not dbobj:
        dbobj = models.Database(
            database_name=database_name,
            expose_in_sqllab=True)
    dbobj.set_sqlalchemy_uri(conf.get('METADATA_DATABASE_URI'))
    db.session.add(dbobj)
    db.session.commit()

    return dbobj


get_or_create_metadata_db()
