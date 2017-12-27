from rest_framework_mongoengine.viewsets import ModelViewSet
from .document import Videos
from .serializer import VideosSerializer


class VideosViewSet(ModelViewSet):
    lookup_field = 'id'
    serializer_class = VideosSerializer
    queryset = Videos.objects.all()
