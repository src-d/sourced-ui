# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
"""merge cancel_connection with v0.33rc1

Revision ID: a8beb5b5ce4d
Revises: ('80aa3f04bc82', 'dd907ff5ac79')
Create Date: 2019-06-04 16:11:31.558747

"""

# revision identifiers, used by Alembic.
revision = "a8beb5b5ce4d"
down_revision = ("80aa3f04bc82", "dd907ff5ac79")

from alembic import op
import sqlalchemy as sa


def upgrade():
    pass


def downgrade():
    pass
