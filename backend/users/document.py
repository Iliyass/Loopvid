from mongoengine import fields, Document


class Users(Document):
  username = fields.StringField();