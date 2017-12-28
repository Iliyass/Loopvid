from mongoengine import fields, Document, EmbeddedDocument

class Categories(Document):
  title = fields.StringField()
  desc = fields.StringField()
  cover = fields.URLField()
  created_at = fields.DateTimeField()
  modified_at = fields.DateTimeField()