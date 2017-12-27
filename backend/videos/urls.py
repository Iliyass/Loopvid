from django.conf.urls import url, include
from rest_framework_mongoengine.routers import DefaultRouter

from .views import VideosViewSet


router = DefaultRouter()
router.register('videos', VideosViewSet, base_name='videos_view_set')

module_urls = router.urls
