from mongoengine import *


class Videos(DynamicDocument):
  url = StringField()