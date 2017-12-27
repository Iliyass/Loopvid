from .document import Users
from rest_framework_mongoengine.serializers import DocumentSerializer

class UsersSerializer(DocumentSerializer):
    class Meta:
        model = Users
        fields = '__all__'
