GITBASE_DATABASE_URI = 'mysql://root@127.0.0.1:3306/gitbase'
BBLFSH_WEB_ADDRESS = 'http://127.0.0.1:9999'
WTF_CSRF_EXEMPT_LIST = ['superset.bblfsh.views.api']


def mutator():
    # pylint: disable=unused-variable
    from superset.bblfsh import views  # noqa


FLASK_APP_MUTATOR = mutator
