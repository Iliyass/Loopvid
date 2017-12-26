import os

MONGODB_SERVER = os.environ.get('MONGODB_SERVER')
MONGODB_PORT = int(os.environ.get('MONGODB_PORT'))
MONGODB_DB = os.environ.get('MONGODB_DB')

APPEND_SLASH = False