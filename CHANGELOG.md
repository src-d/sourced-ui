# Changelog

## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

### New Features

- Loading of default dashboards on bootstrap ([#71](https://github.com/src-d/superset-compose/issues/71)).
- Update gitbase to v0.20.0 ([#81](https://github.com/src-d/superset-compose/issues/81)).
- Update bblfsh to v2.14.0 ([#81](https://github.com/src-d/superset-compose/issues/81)).
- Use sparksql instead of mysql for enterprise version ([#79](https://github.com/src-d/superset-compose/issues/79)).
- Cancel query to database on stop ([#35](https://github.com/src-d/superset-compose/issues/35)).

</details>

## v0.0.1 - 2019-05-16

The `srcd/superset` docker image is based on Superset 0.32, and contains the following additions:
- an extra tab, UAST, to explore bblfsh parsing results.
- SQL Lab contains a modal dialog to visualize columns that contain UAST.
- source{d} branding.
- SQLAlchemy dependency upgraded to 1.3, for compatibility with gitbase ([#18](https://github.com/src-d/superset-compose/issues/18)).
- Backport an upstream fix for Hive Database connection ([#21](https://github.com/src-d/superset-compose/issues/21)).
