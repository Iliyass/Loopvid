from .document import Categories
from rest_framework_mongoengine.serializers import DocumentSerializer

class CategoriesSerializer(DocumentSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
