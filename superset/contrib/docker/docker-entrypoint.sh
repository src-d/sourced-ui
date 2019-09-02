#!/bin/bash
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
set -ex

if [ "`whoami`" = "root" ] && [ -n "$LOCAL_USER" ]; then

    # Change the UID and GUID of 'superset' user (matching host user).
    # It will grant write access to the data from the volumes,
    # inside of the container and on host file system (see #221)
    find . -group superset -exec chgrp $LOCAL_USER '{}' \;
    groupmod -g $LOCAL_USER superset
    usermod -u $LOCAL_USER superset
    chown -R superset superset/assets/node_modules

    su -c "/entrypoint.sh" superset
    exit $?
fi

if [ "$SUPERSET_NO_DB_INIT" != "true" ]; then
    python bootstrap.py
fi

if [ "$#" -ne 0 ]; then
    exec "$@"
elif [ "$SUPERSET_ENV" = "development" ]; then
    celery worker --app=superset.sql_lab:celery_app --pool=gevent -Ofair &
    # In development mode, the UI will be served by `webpack-dev-server` instead of by `Flask`
    # `webpack-dev-server` will serve the UI from the port 8088, and it will proxy
    # non-asset requests to `Flask`, wich is listening at the port 8081
    # Doing so, updates to asset sources will be reflected in-browser without a refresh.
    (cd superset/assets/ && npm install)
    (cd superset/assets/ && npm run dev-server -- --host=0.0.0.0 --port=8088 --supersetPort=8081) &
    FLASK_ENV=development FLASK_APP=superset:app flask run -p 8081 --with-threads --reload --debugger --host=0.0.0.0
elif [ "$SUPERSET_ENV" = "production" ]; then
    celery worker --app=superset.sql_lab:celery_app --pool=gevent -Ofair &
    exec gunicorn --bind 0.0.0.0:8088 \
        --workers $((2 * $(getconf _NPROCESSORS_ONLN) + 1)) \
        --timeout 300 \
        --limit-request-line 0 \
        --limit-request-field_size 0 \
        superset:app
else
    superset --help
fi
