from sqlalchemy import event
from .entity.sqlAlchemy import db
@event.listens_for(db.Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()