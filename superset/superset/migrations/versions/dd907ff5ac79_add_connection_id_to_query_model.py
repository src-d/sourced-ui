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
"""add_connection_id_to_query_model

Revision ID: dd907ff5ac79
Revises: c82ee8a39623
Create Date: 2019-05-17 15:39:05.611216

"""

# revision identifiers, used by Alembic.
revision = 'dd907ff5ac79'
down_revision = 'c82ee8a39623'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('query', sa.Column('connection_id', sa.Integer(), nullable=True))


def downgrade():
    op.drop_column('query', 'connection_id')
