# source{d} UI

## Contents

- [Development](#development)

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
