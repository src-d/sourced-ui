The dashboards placed here will be included in Superset on bootstrap.

You can export Superset dashboards with the `superset` command included in the docker image. For example:

```shell
docker-compose exec superset superset export_dashboards > /dashboards.json
```
