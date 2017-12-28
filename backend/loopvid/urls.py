from django.conf.urls import url, include
from rest_framework_mongoengine.routers import DefaultRouter

from videos.urls import route as VideosUrls
from users.urls import route as UsersUrls
from categories.urls import route as CategoriesUrls


router = DefaultRouter()

router.register(UsersUrls.get('path'), UsersUrls.get('viewset'), **UsersUrls.get('kwargs'))
router.register(VideosUrls.get('path'), VideosUrls.get('viewset'), **VideosUrls.get('kwargs'))
router.register(CategoriesUrls.get('path'), CategoriesUrls.get('viewset'), **CategoriesUrls.get('kwargs'))

urlpatterns = router.urls