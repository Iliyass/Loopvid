from rest_framework_mongoengine.viewsets import ModelViewSet
from .document import Categories
from .serializer import CategoriesSerializer


class CategoriesViewSet(ModelViewSet):
    lookup_field = 'id'
    serializer_class = CategoriesSerializer
    queryset = Categories.objects.all()
    