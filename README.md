# source{d} UI

Web UI for [source{d} Community Edition (CE)](https://github.com/src-d/sourced-ce).


## Description

This repository contains the code for the [`srcd/sourced-ui`](https://hub.docker.com/r/srcd/sourced-ui) docker image. This image is based on [Apache Superset](https://github.com/apache/incubator-superset), and contains the following additions:

- An extra tab, UAST, to explore bblfsh parsing results.
- SQL Lab contains a modal dialog to visualize columns that contain UAST.
- source{d} branding.
- Loading of default dashboards on bootstrap.
- Creation of a default user on bootstrap, `admin`/`admin`.
- Backport an upstream fix for Hive Database connection ([#21](https://github.com/src-d/sourced-ui/issues/21)).
- Cancel database queries on stop ([#35](https://github.com/src-d/sourced-ui/issues/35)).
- Creates datasources for gitbase and metadata db on bootstrap

The image is designed to be deployed as two containers, one with `SUPERSET_ENV=production` and the other one with `SUPERSET_ENV=celery`. Take a look at the docker-compose.yml file in the [src-d/sourced-ce](https://github.com/src-d/sourced-ce/blob/master/docker-compose.yml) repository for more details.

### Environment Variables

You can configure the Docker image using the following environment variables:

| Environment Variable      | Description                                                             |
|---------------------------|-------------------------------------------------------------------------|
| `ADMIN_LOGIN`             | Username for the admin user                                             |
| `ADMIN_FIRST_NAME`        | First name of the admin user                                            |
| `ADMIN_LAST_NAME`         | Last name of the admin user                                             |
| `ADMIN_EMAIL`             | Email of the admin user                                                 |
| `ADMIN_PASSWORD`          | Password of the admin user                                              |
| `BBLFSH_WEB_HOST`         | Hostname for bblfsh-web                                                 |
| `BBLFSH_WEB_PORT`         | Port for bblfsh-web                                                     |
| `GITBASE_HOST`            | Hostname for Gitbase                                                    |
| `GITBASE_PORT`            | Port for Gitbase                                                        |
| `GITBASE_DB`              | Database name for Gitbase                                               |
| `GITBASE_USER`            | Username for Gitbase                                                    |
| `GITBASE_PASSWORD`        | Password for Gitbase                                                    |
| `POSTGRES_HOST`           | Hostname for Superset DB                                                |
| `POSTGRES_PORT`           | Port for Superset DB                                                    |
| `POSTGRES_DB`             | Database for Superset DB                                                |
| `POSTGRES_USER`           | Username for Superset DB                                                |
| `POSTGRES_PASSWORD`       | Password for Superset DB                                                |
| `REDIS_HOST`              | Hostname for Redis                                                      |
| `REDIS_PORT`              | Port for Redis                                                          |
| `SUPERSET_ENV`            | Environment Superset runs in `production`/`celery`/`development`        |
| `SUPERSET_NO_INIT_DB`     | Does not run the database init script if set to `true`                  |
| `SYNC_MODE`               | Adds metadata datasource and welcome dashboard if set to `true`         |
| `METADATA_HOST`           | Hostname for metadata DB (when `SYNC_MODE` is set to `true`)            |
| `METADATA_PORT`           | Port for metadata DB (when `SYNC_MODE` is set to `true`)                |
| `METADATA_USER`           | Username for metadata DB (when `SYNC_MODE` is set to `true`)            |
| `METADATA_PASSWORD`       | Password for metadata DB (when `SYNC_MODE` is set to `true`)            |
| `METADATA_DB`             | Database name for metadata (when `SYNC_MODE` is set to `true`)          |
| `OAUTH_PROVIDER`          | Use OAuth provider for authorization. Currently only `google`           |
| `OAUTH_CONSUMER_KEY`      | OAuth provider consumer key (aka client_id)                             |
| `OAUTH_CONSUMER_SECRET`   | OAuth provider consumer secret (aka client_secret)                      |
| `OAUTH_REGISTRATION_ROLE` | The role for newly registered users using OAuth `Admin`/`Alpha`/`Gamma` |

## Contribute

[Contributions](https://github.com/src-d/sourced-ui/issues) are more than welcome. In the [Contributing Guidelines](./CONTRIBUTING.md) you will find more info about how to contribute, build the ui, or run it for development with hot reloading. 


## Code of Conduct

All activities under source{d} projects are governed by the
[source{d} code of conduct](https://github.com/src-d/guide/blob/master/.github/CODE_OF_CONDUCT.md).


## License

Apache License Version 2.0, see [LICENSE](LICENSE.md).
