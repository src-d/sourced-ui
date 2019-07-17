# Contribution Guidelines

As all source{d} projects, this project follows the
[source{d} Contributing Guidelines](https://github.com/src-d/guide/blob/master/engineering/documents/CONTRIBUTING.md).


# Additional Contribution Guidelines

In addition to the [source{d} Contributing Guidelines](https://github.com/src-d/guide/blob/master/engineering/documents/CONTRIBUTING.md),
this project follows the following guidelines.

**Content:**

- [Changelog](#changelog)
- [Run source{d} CE For Development With Hot Reloading](#run-source-d-ce-for-development-with-hot-reloading)


## Changelog

This project lists the important changes between releases in the
[`CHANGELOG.md`](CHANGELOG.md) file.

If you open a PR, you should also add a brief summary in the `CHANGELOG.md`
mentioning the new feature, change or bugfix that you proposed.


## Run source{d} CE For Development With Hot Reloading

Running **source{d} CE** in development mode will enable hot reloading at
http://127.0.0.1:8088, so every change you perform in `srcd` or `superset`
directories will trigger a refresh in your browser with the new code.

1. Install the latest version of [**source{d} CE**](https://github.com/src-d/sourced-ce/releases)
(see [installation guide](https://docs.sourced.tech/community-edition/quickstart/2-install-sourced)
if needed)

1. Run the watcher.

    <details>
        <summary><b>IMPORTANT note:</b> Requirements for the watcher</summary>

    The watcher requires either [`inotify-tools`](https://github.com/rvoicilas/inotify-tools/wiki)
    (for Linux), or [`fswatch`](https://github.com/emcrisostomo/fswatch)
    (for Linux and MacOS)

    - To install `inotify-tools`
        - in Ubuntu you can run:
            ```shell
            $ sudo apt-get install inotify-tools
            ```

    - To install `fswatch`:
        - in MacOS, you can [use brew to install `fswatch`](https://brewinstall.org/install-fswatch-on-mac-with-brew):
            ```shell
            $ brew install fswatch
            ```
        - in Ubuntu you can build and install [from `fswatch` sources](https://github.com/emcrisostomo/fswatch):
            ```shell
            $ ./autogen.sh
            $ ./configure
            $ make
            $ sudo make install
            $ sudo ldconfig
            ```
    </details>

    <details>
        <summary><b>ALTERNATIVE:</b> If you can not use any watcher</summary>

    - If you cannot use any of these watchers, you can just run this:

        ```shell
        $ make set-override # to prepare the environment
        $ make patch # needed EVERYTIME you change something in `srcd`
        $ make clean # once you finish, to clean up everything.
        ```
    </details>

    To watch for changes in `srcd` directory, run the local watcher in one tab,
    from your local `sourced-ui` root directory:

    ```shell
    $ make dev-prepare
    ```

    You can stop it pressing `Ctrl+C`. Once you do it, the patch will be
    automatically cleaned.

1. Run `sourced` as usually (see [execution guide](https://docs.sourced.tech/community-edition/quickstart/3-init-sourced)
    if needed):

    ```shell
    # for repositories from GitHub organizations
    $ sourced init orgs <orgs...> --token=<token>

    # or, for repositories stored locally
    $ sourced init local </path/to/repos>
    ```

    The first time you launch it, it will take some time to build all the UI assets,
    you can see the progress of the build from `sourced-ui` logs (see next step).

1. To see `sourced-ui` logs (with `npm` errors and such), run:

    ```shell
    $ sourced logs -f sourced-ui
    ```
