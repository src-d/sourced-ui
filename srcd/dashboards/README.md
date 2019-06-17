The dashboards placed here will be included in Superset on bootstrap.

You can export Superset dashboards with the `superset` command included in the docker image. For example:

```shell
$ SOURCED_UI_CONTAINER=`docker ps --format "{{.Names}}" | grep sourced-ui`
$ docker exec ${SOURCED_UI_CONTAINER} superset export_dashboards
```
