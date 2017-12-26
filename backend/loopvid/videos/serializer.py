from .document import Videos
from rest_framework_mongoengine.serializers import DocumentSerializer
from rest_framework.fields import *


class VideosSerializer(DocumentSerializer):
    url = CharField()

    class Meta:
        model = Videos
        fields = ( 'url', )

