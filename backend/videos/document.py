from mongoengine import fields, Document


class Videos(Document):
  url = fields.URLField()
  title = fields.StringField()
  desc = fields.StringField()
  thumbnail = fields.URLField()