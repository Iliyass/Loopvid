from mongoengine import fields, Document, EmbeddedDocument

class UserEmbed(EmbeddedDocument):
  user_id = fields.StringField()
  username = fields.StringField()
  avatar = fields.URLField()

class Videos(Document):
  url = fields.URLField()
  title = fields.StringField()
  desc = fields.StringField()
  thumbnail = fields.URLField()
  created_at = fields.DateTimeField()
  modified_at = fields.DateTimeField()
  upvote = fields.IntField()
  downvote = fields.IntField()
  quality = fields.StringField()
  view_count = fields.StringField()
  minute_length = fields.IntField()
  user = fields.EmbeddedDocumentField(UserEmbed)
  is_published = fields.BooleanField()
  category = fields.ReferenceField("Categories")