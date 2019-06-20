# Changelog

## [Unreleased]
<details>
  <summary>
    - Add a dashboard with charts making use of gitbase data (#105, #110).
    - Add a dashboard based on metadata (#137).
    - Add welcome dashboard for orgs sync mode (#112).
    - Create metadata db datasources on bootstrap (#112).
    - Use welcome dashboard as a default page in orgs sync mode (#112).
    - Environment variable SUPERSET_NO_DB_INIT (#99).
    - Gitbase datasource is now updated if we restart sourced-ui with a changed GITBASE_* env variable (#96).
    - Remove dependency on src-d/ci (#100).
  </summary>

</details>

## [v0.2.0](https://github.com/src-d/sourced-ui/releases/tag/v0.2.0) - 2019-06-07

- Update superset to v0.33 ([#89](https://github.com/src-d/sourced-ui/issues/89))
- Fix incorrect timeout value for charts ([#95](https://github.com/src-d/sourced-ui/issues/95)).

## [v0.1.0](https://github.com/src-d/sourced-ui/releases/tag/v0.1.0) - 2019-06-03

The `srcd/sourced-ui` docker image is based on Superset 0.32, and contains the following additions:
- An extra tab, UAST, to explore bblfsh parsing results.
- SQL Lab contains a modal dialog to visualize columns that contain UAST.
- source{d} branding.
- Loading of default dashboards on bootstrap.
- Creation of a default user on bootstrap, `admin`/`admin`.
- SQLAlchemy dependency upgraded to 1.3, for compatibility with gitbase ([#18](https://github.com/src-d/sourced-ui/issues/18)).
- Backport an upstream fix for Hive Database connection ([#21](https://github.com/src-d/sourced-ui/issues/21)).
- Cancel database queries on stop ([#35](https://github.com/src-d/sourced-ui/issues/35)).
