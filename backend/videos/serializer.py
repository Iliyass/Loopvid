from .document import Videos
from rest_framework_mongoengine.serializers import DocumentSerializer

class VideosSerializer(DocumentSerializer):
    class Meta:
        model = Videos
        fields = '__all__'
