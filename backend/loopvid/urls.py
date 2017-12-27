from django.conf.urls import url, include
from rest_framework_mongoengine.routers import DefaultRouter

from videos.urls import module_urls as VideoUrls


router = DefaultRouter()

urlpatterns = router.urls + VideoUrls
