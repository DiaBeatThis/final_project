from django.conf.urls import url, include
from django.contrib import admin
from diabeatthis import views
from rest_framework import routers
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r'profile', views.ProfileViewSet)
router.register(r'nutrition', views.NutritionViewSet)
router.register(r'meals', views.MealsViewSet)
router.register(r'physical_activity', views.PhysicalActivityViewSet)
router.register(r'insulin', views.InsulinViewSet)
router.register(r'blood_sugar', views.BloodSugarViewSet)
router.register(r'water', views.WaterViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
	url(r'^fitbit/', include('fitapp.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': '/'}, name='logout'),
    url(r'^faq/$', TemplateView.as_view(template_name="faq.html")),
    url(r'^footer/$', TemplateView.as_view(template_name="footer.html")),
    url(r'^header_loggedin/$', TemplateView.as_view(template_name="header_loggedin.html")),
    url(r'^home/$', TemplateView.as_view(template_name="home.html")),
    url(r'^profile/$', views.profile, name="profile.html"),
    url(r'^register/$', views.register, name='register'),
    ]
