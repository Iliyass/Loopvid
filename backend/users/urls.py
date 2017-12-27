from django.conf.urls import url, include
from rest_framework_mongoengine.routers import DefaultRouter

from .views import UsersViewSet


router = DefaultRouter()
router.register('users', UsersViewSet, base_name='users_view_set')

module_urls = router.urls
