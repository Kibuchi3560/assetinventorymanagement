"""Add user_id to Employee

Revision ID: 2637df672f44
Revises: 
Create Date: 2025-02-28 04:58:30.321079

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '2637df672f44'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Get the current connection and inspector
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = [col['name'] for col in inspector.get_columns('employee')]

    # Only add the column and foreign key if 'user_id' does not exist.
    if 'user_id' not in columns:
        with op.batch_alter_table('employee', schema=None) as batch_op:
            batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
            # It is a good practice to name your foreign key constraint.
            batch_op.create_foreign_key('fk_employee_user', 'user', ['user_id'], ['id'])
    else:
        print("Column 'user_id' already exists; skipping add_column and foreign key creation.")

def downgrade():
    # Optionally, you can check if the column exists before dropping it.
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = [col['name'] for col in inspector.get_columns('employee')]
    
    if 'user_id' in columns:
        with op.batch_alter_table('employee', schema=None) as batch_op:
            # If you named the foreign key in upgrade, drop it by name.
            batch_op.drop_constraint('fk_employee_user', type_='foreignkey')
            batch_op.drop_column('user_id')
