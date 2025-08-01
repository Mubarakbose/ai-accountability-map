import os
import sys
from dotenv import load_dotenv
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# --- Load environment variables ---
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not set in .env")

# --- Set DB URL from env ---
config = context.config
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# --- Setup logging ---
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# --- Import models and Base ---
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database import Base
import models  # this ensures all models are registered

target_metadata = Base.metadata

# --- Migration runners ---

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


# --- Execute correct runner ---
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
