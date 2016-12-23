from django.conf.urls import url, include
from django.contrib import admin
from diabeatthis import views
from rest_framework import routers
# from django.contrib.auth import views as auth_views

router = routers.DefaultRouter()
router.register(r'api/profile', views.ProfileViewSet)
router.register(r'api/nutrition', views.NutritionViewSet)
router.register(r'api/meals', views.MealsViewSet)
router.register(r'api/physical_activity', views.PhysicalActivityViewSet)
router.register(r'api/insulin', views.InsulinViewSet)
router.register(r'api/blood_sugar', views.BloodSugarViewSet)
router.register(r'api/water', views.WaterViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
