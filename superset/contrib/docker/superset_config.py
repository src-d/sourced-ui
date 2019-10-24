from collections import OrderedDict
import os

from werkzeug.contrib.cache import RedisCache


# Disable druid

DRUID_IS_ACTIVE = False

DEFAULT_MODULE_DS_MAP = OrderedDict([
    ('superset.connectors.sqla.models', ['SqlaTable']),
])


# Helper functions

def get_env_variable(var_name, default=None):
    """Get the environment variable or raise exception."""
    try:
        return os.environ[var_name]
    except KeyError:
        if default is not None:
            return default
        else:
            error_msg = 'The environment variable {} was missing, abort...'\
                        .format(var_name)
            raise EnvironmentError(error_msg)


# Branding

APP_NAME = 'Source{d}'
APP_ICON = '/static/assets/images/sourced-logo-2x.png'
APP_ICON_WIDTH = 126

# Main DB settings

POSTGRES_USER = get_env_variable('POSTGRES_USER')
POSTGRES_PASSWORD = get_env_variable('POSTGRES_PASSWORD')
POSTGRES_HOST = get_env_variable('POSTGRES_HOST')
POSTGRES_PORT = get_env_variable('POSTGRES_PORT')
POSTGRES_DB = get_env_variable('POSTGRES_DB')
SQLALCHEMY_DATABASE_URI = 'postgresql://%s:%s@%s:%s/%s' % (POSTGRES_USER,
                                                           POSTGRES_PASSWORD,
                                                           POSTGRES_HOST,
                                                           POSTGRES_PORT,
                                                           POSTGRES_DB)

# Cache settings

REDIS_HOST = get_env_variable('REDIS_HOST')
REDIS_PORT = get_env_variable('REDIS_PORT')

CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 60 * 60 * 24,  # 1 day default (in secs)
    'CACHE_KEY_PREFIX': 'superset_results',
    'CACHE_REDIS_URL': 'redis://%s:%s/0' % (REDIS_HOST, REDIS_PORT),
}

RESULTS_BACKEND = RedisCache(
    host=REDIS_HOST, port=REDIS_PORT, key_prefix='superset_results')


# Celery configuration. CeleryConfig doesn't inherit defaults from superset/config.

class CeleryConfig(object):
    BROKER_URL = 'redis://%s:%s/0' % (REDIS_HOST, REDIS_PORT)
    CELERY_IMPORTS = ('superset.sql_lab', 'superset.tasks')
    CELERY_RESULT_BACKEND = 'redis://%s:%s/1' % (REDIS_HOST, REDIS_PORT)
    CELERYD_LOG_LEVEL = 'INFO'
    CELERYD_PREFETCH_MULTIPLIER = 1
    CELERY_ACKS_LATE = True
    CELERY_ANNOTATIONS = {
        'sql_lab.get_sql_results': {
            'rate_limit': '100/s',
        },
    }


CELERY_CONFIG = CeleryConfig

# Gitbase configuration

IS_EE = get_env_variable('MODE', 'Community') == 'Enterprise'
GITBASE_USER = get_env_variable('GITBASE_USER', '')
GITBASE_PASSWORD = get_env_variable('GITBASE_PASSWORD', '')
GITBASE_HOST = get_env_variable('GITBASE_HOST')
GITBASE_PORT = get_env_variable('GITBASE_PORT')
GITBASE_DB = get_env_variable('GITBASE_DB')
GITBASE_PREFIX = 'sparksql' if IS_EE else 'mysql'
GITBASE_AUTH = ''
if GITBASE_USER:
    GITBASE_AUTH = GITBASE_USER
    if GITBASE_PASSWORD:
        GITBASE_AUTH += ':%s' % GITBASE_PASSWORD
    GITBASE_AUTH += '@'

GITBASE_QUERY_PARAMS = ''
if not IS_EE:
    GITBASE_QUERY_PARAMS = '?charset=utf8'
GITBASE_DATABASE_URI = '%s://%s%s:%s/%s%s' % (GITBASE_PREFIX,
                                              GITBASE_AUTH,
                                              GITBASE_HOST,
                                              GITBASE_PORT,
                                              GITBASE_DB,
                                              GITBASE_QUERY_PARAMS)

SQLLAB_DEFAULT_DBID = 2  # set gitbase as default DB in SQL Lab

# Metadata db configuration, use the same db server as main db

SYNC_MODE = get_env_variable('SYNC_MODE', False)
if SYNC_MODE:
    METADATA_USER = get_env_variable('METADATA_USER')
    METADATA_PASSWORD = get_env_variable('METADATA_PASSWORD')
    METADATA_HOST = get_env_variable('METADATA_HOST')
    METADATA_PORT = get_env_variable('METADATA_PORT')
    METADATA_DB = get_env_variable('METADATA_DB')
    METADATA_DATABASE_URI = 'postgresql://%s:%s@%s:%s/%s' % (METADATA_USER,
                                                             METADATA_PASSWORD,
                                                             METADATA_HOST,
                                                             METADATA_PORT,
                                                             METADATA_DB)

# Log Settings

LOG_LEVEL = 'INFO'

# Bblfsh-web configuration

BBLFSH_WEB_HOST = get_env_variable('BBLFSH_WEB_HOST')
BBLFSH_WEB_PORT = get_env_variable('BBLFSH_WEB_PORT')
BBLFSH_WEB_ADDRESS = 'http://%s:%s' % (BBLFSH_WEB_HOST, BBLFSH_WEB_PORT)
WTF_CSRF_EXEMPT_LIST = ['superset.bblfsh.views.api']

# Defaults configuration

DEFAULT_DASHBOARD_ID = 2 if SYNC_MODE else 2
DEFAULT_USERNAME = get_env_variable('ADMIN_LOGIN')


# Alter flask application

def mutator(f):
    from superset.bblfsh import views  # noqa


FLASK_APP_MUTATOR = mutator

# This parameter documented as deprecated but frontend still uses it
# Should match `--timeout` value of gunicorn
SUPERSET_WEBSERVER_TIMEOUT = 300

# Authorization configuration

OAUTH_PROVIDER = get_env_variable('OAUTH_PROVIDER', False)
if OAUTH_PROVIDER:
    OAUTH_PROVIDERS = [
        {
            'name': 'google',
            'icon': 'fa-google',
            'token_key': 'access_token',
            'remote_app': {
                'consumer_key': get_env_variable('OAUTH_CONSUMER_KEY'),
                'consumer_secret': get_env_variable('OAUTH_CONSUMER_SECRET'),
                'base_url': 'https://www.googleapis.com/oauth2/v2/',
                'request_token_params': {
                    'scope': 'email profile'
                },
                'request_token_url': None,
                'access_token_url': 'https://accounts.google.com/o/oauth2/token',
                'authorize_url': 'https://accounts.google.com/o/oauth2/auth'
            }
        }
    ]

    if OAUTH_PROVIDER not in [p['name'] for p in OAUTH_PROVIDERS]:
        raise EnvironmentError(
            'Unknown OAuth provider {}'.format(OAUTH_PROVIDER))

    from flask_appbuilder.security.manager import AUTH_OAUTH

    AUTH_TYPE = AUTH_OAUTH
    AUTH_USER_REGISTRATION = True
    AUTH_USER_REGISTRATION_ROLE = get_env_variable('OAUTH_REGISTRATION_ROLE')
