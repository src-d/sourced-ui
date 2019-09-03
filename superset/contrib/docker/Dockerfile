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
FROM node:12 AS static

WORKDIR /home/superset

COPY superset/assets superset/assets

RUN cd superset/assets \
        && npm ci \
        && npm run build

FROM python:3.6 AS wheels

WORKDIR /home/superset

RUN apt-get update -y
RUN apt-get install -y libsasl2-dev

COPY requirements.txt .
COPY requirements-dev.txt .
COPY contrib/docker/requirements-extra.txt .

RUN pip install --upgrade setuptools pip \
        && pip wheel --wheel-dir=/wheels \
        -r requirements.txt -r requirements-dev.txt -r requirements-extra.txt

FROM python:3.6-slim

ARG DEV_BUILD

RUN useradd --user-group --create-home --no-log-init --shell /bin/bash superset

# Configure environment
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

RUN apt-get update -y

# Install git as it is used for requirements from Github
RUN apt-get install -y git
# Install superset dependencies
RUN apt-get install -y libsasl2-dev libsasl2-2 libsasl2-modules-gssapi-mit

RUN if [ "$DEV_BUILD" = "true" ]; \
        then apt-get install -y curl && \
        curl -sL https://deb.nodesource.com/setup_10.x | bash - \
        && apt-get install -y nodejs vim less postgresql-client redis-tools; fi

WORKDIR /home/superset

COPY --from=wheels /wheels /wheels

COPY requirements.txt .
COPY requirements-dev.txt .
COPY contrib/docker/requirements-extra.txt .

RUN pip install --upgrade setuptools pip \
        && pip install --no-index --find-links=/wheels \
        -r requirements.txt -r requirements-dev.txt -r requirements-extra.txt \
        && rm -rf /wheels

RUN if [ "$DEV_BUILD" != "true" ]; \
        then apt-get -y --purge autoremove git; fi

COPY --chown=superset:superset superset superset
COPY --chown=superset:superset dashboards dashboards

ENV PATH=/home/superset/superset/bin:$PATH \
    PYTHONPATH=/home/superset/:$PYTHONPATH \
        SUPERSET_CONFIG_PATH=/home/superset/superset/superset_config.py

COPY --chown=superset:superset --from=static /home/superset/superset/assets/dist superset/assets/dist

USER superset

COPY contrib/docker/superset_config.py ./superset/
COPY contrib/docker/bootstrap.py .
COPY contrib/docker/docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

HEALTHCHECK CMD ["curl", "-f", "http://localhost:8088/health"]

EXPOSE 8088
