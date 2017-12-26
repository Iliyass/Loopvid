from rest_framework_mongoengine.viewsets import ModelViewSet
from .document import Videos
from .serializer import VideosSerializer


class VideosViewSet(ModelViewSet):
    serializer_class = VideosSerializer
    queryset = Videos.objects.all()
