# Changelog

## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

### Added

- Superset updated to v0.34.0rc1 which brings many improvements and bug fixes ([#250](https://github.com/src-d/sourced-ui/issues/250))

</details>

## [v0.5.0](https://github.com/src-d/sourced-ui/releases/tag/v0.5.0) - 2019-08-20

### Added

- Apply source{d} brand styling to the CodeMirror sourced code viewer ([#253](https://github.com/src-d/sourced-ui/issues/253), [#260](https://github.com/src-d/sourced-ui/issues/260)).

### Changed

- Improve the dashboard export mechanism, saving `is_sqllab_view` to correctly hide non-visible tables when the dashboard is imported. The tables created for the default charts are now hidden by default ([#243](https://github.com/src-d/sourced-ui/issues/243)).

### Fixed

- Fix sorting in most active repositories chart ([#251](https://github.com/src-d/sourced-ui/issues/251)).
- Timestamp type not mapped correctly from Spark SQL to Hive ([#227](https://github.com/src-d/sourced-ui/issues/227)).
- Fix tables' preview in SQL Lab for SparkSQL engine ([#246](https://github.com/src-d/sourced-ui/pull/246)).

## [v0.4.0](https://github.com/src-d/sourced-ui/releases/tag/v0.4.0) - 2019-08-06

### Changed

- New styling that follows the source{d} branding ([#139](https://github.com/src-d/sourced-ui/issues/139), [#142](https://github.com/src-d/sourced-ui/issues/142), [#204](https://github.com/src-d/sourced-ui/pull/204).)
- Improved method to export and import dashboards as JSON ([#165](https://github.com/src-d/sourced-ui/issues/165)).
- Allow users to re-order top level tabs ([#234](https://github.com/src-d/sourced-ui/pull/234)).
- Disable Druid clusters as datasources ([#238](https://github.com/src-d/sourced-ui/pull/238)).

### Fixed

- Use utf8 encoding for gitbase connection ([#233](https://github.com/src-d/sourced-ui/issues/233)).
- Fixes and improvements in the charts of the default dashboards ([#237](https://github.com/src-d/sourced-ui/issues/237), [#236](https://github.com/src-d/sourced-ui/issues/236)).

### Internal

- Added a development mode to run source{d} with hot reloading. Every change in `srcd` or `superset`
will trigger a refresh in the browser ([see docs](./CONTRIBUTING.md#run-sourced-ce-for-development-with-hot-reloading)).

## [v0.3.0](https://github.com/src-d/sourced-ui/releases/tag/v0.3.0) - 2019-06-27

- New default dashboards
  - Add welcome dashboards with documentation.
  - Add a dashboard with charts making use of gitbase data ([#105](https://github.com/src-d/sourced-ui/issues/105), [#110](https://github.com/src-d/sourced-ui/issues/110)).
  - Add a dashboard based on metadata ([#137](https://github.com/src-d/sourced-ui/issues/137)).
- Create metadata DB datasources on bootstrap ([#112](https://github.com/src-d/sourced-ui/issues/112)).
- Environment variable `SUPERSET_NO_DB_INIT` ([#99](https://github.com/src-d/sourced-ui/issues/99)).
- Gitbase datasource is now updated if we restart sourced-ui with a changed GITBASE_* env variable ([#96](https://github.com/src-d/sourced-ui/issues/96)).
- Remove dependency on src-d/ci ([#100](https://github.com/src-d/sourced-ui/issues/100)).

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
