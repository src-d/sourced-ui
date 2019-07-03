The dashboards placed here will be included in Superset on bootstrap.

You can export Superset dashboards with the `superset` command included in the docker image. For example:

```shell
cd ~/.sourced/workdirs/__active__
docker-compose exec sourced-ui superset export_dashboards --dashboard-id=1 > ~/overview.json
```
