from django.conf.urls import url, include
from rest_framework_mongoengine.routers import DefaultRouter

from videos.urls import module_urls as VideosUrls
from users.urls import module_urls as UsersUrls


router = DefaultRouter()

urlpatterns = router.urls + VideosUrls + UsersUrls
