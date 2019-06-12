#!/usr/bin/env bash
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

# always run migrations
superset db upgrade

# always gitbase script to update datasource if it was changed in env var
python add_gitbase.py

# initialize database if empty
if ! fabmanager list-users --app superset | grep -q $ADMIN_LOGIN; then
    # Create an admin user
    fabmanager create-admin \
        --app superset \
        --username $ADMIN_LOGIN \
        --firstname $ADMIN_FIRST_NAME \
        --lastname $ADMIN_LAST_NAME \
        --email $ADMIN_EMAIL \
        --password $ADMIN_PASSWORD
    
    # Create default roles and permissions
    superset init

    # Add dashboards
    superset import_dashboards --recursive --path /home/superset/dashboards
fi

