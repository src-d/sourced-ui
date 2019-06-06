# source{d} UI

Web UI for [source{d} Community Edition (CE)](https://github.com/src-d/sourced-ce).

## Contents

- [Description](#description)
- [Development](#development)

## Description

This repository contains the code for the [`srcd/sourced-ui`](https://hub.docker.com/r/srcd/sourced-ui) docker image. This image is based on [Apache Superset](https://github.com/apache/incubator-superset) 0.32, and contains the following additions:

- An extra tab, UAST, to explore bblfsh parsing results.
- SQL Lab contains a modal dialog to visualize columns that contain UAST.
- source{d} branding.
- Loading of default dashboards on bootstrap.
- Creation of a default user on bootstrap, `admin`/`admin`.
- SQLAlchemy dependency upgraded to 1.3, for compatibility with gitbase ([#18](https://github.com/src-d/sourced-ui/issues/18)).
- Backport an upstream fix for Hive Database connection ([#21](https://github.com/src-d/sourced-ui/issues/21)).
- Cancel database queries on stop ([#35](https://github.com/src-d/sourced-ui/issues/35)).

## Development

### Setup local environment

Download the `docker-compose.yml` file from [`src-d/sourced-ce`](https://github.com/src-d/sourced-ce), and run the dependencies:
```
docker-compose up gitbase bblfsh-web
```

Update superset directory:

```
make patch-dev
```

Enter into `superset` directory:
```
cd superset
```

Follow original superset instructions for [Flask server](https://github.com/apache/incubator-superset/blob/release--0.32/CONTRIBUTING.md#flask-server) and [Frontend assets](https://github.com/apache/incubator-superset/blob/release--0.32/CONTRIBUTING.md#frontend-assets)


### Build docker image

```
VERSION=latest make build
```

The image name is defined in the `Makefile`.

### Work with superset upstream

Superset version which we are based on is defined in `Makefile`.

To see which files are patched compare to upstream, run:

```
make diff-stat
```

To see diff with upstream, run:

```
make diff
```
