from mongoengine import fields, Document
from django.contrib.auth.hashers import make_password


class Users(Document):
  email = fields.EmailField(verbose_name='e-mail address', required=True)
  username = fields.StringField()
  avatar = fields.URLField()  
  password = fields.StringField()
  is_active = fields.BooleanField(default=False)
  is_admin = fields.BooleanField(default=False)

  def set_password(self, raw_password):
    self.modify(password=make_password(raw_password))