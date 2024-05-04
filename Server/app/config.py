from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db?foreign_keys=on'
    SECRET_KEY = 'a87dswta8s7d8asdas87da8sd'
    JWT_EXPIRATION_DELTA = timedelta(hours=2)