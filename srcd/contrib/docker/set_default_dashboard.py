"""
Superset allows to redirect user to a default dashboard
but the only way to set this dashboard is by code
"""

from flask_appbuilder.security.sqla.models import User

from superset import conf, db
from superset.models.core import Dashboard
from superset.models.user_attributes import UserAttribute


def set_welcome_dashboard(id, username):
    # Get default user
    user = db.session.query(User).filter_by(username=username).first()

    # Make sure welcome dashboard exists
    dashboard = db.session.query(Dashboard).filter_by(id=id).first()

    # Set dashboard as default
    extra_attributes = UserAttribute(
        user_id=user.id,
        welcome_dashboard_id=dashboard.id,
    )
    db.session.add(extra_attributes)
    db.session.commit()


set_welcome_dashboard(conf.get('DEFAULT_DASHBOARD_ID'),
                      conf.get('DEFAULT_USERNAME'))
