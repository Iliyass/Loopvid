from rest_framework_mongoengine.viewsets import ModelViewSet
from .document import Users
from .serializer import UsersSerializer


class UsersViewSet(ModelViewSet):
    lookup_field = 'id'
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
