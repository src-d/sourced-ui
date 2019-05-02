GITBASE_DATABASE_URI = 'mysql://root@127.0.0.1:3306/gitbase'


def mutator(f):
    from superset.bblfsh import views  # noqa


FLASK_APP_MUTATOR = mutator
