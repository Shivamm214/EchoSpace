from django.contrib import admin
from django.urls import path
from home.views import *
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    path('check_username/', check_username, name='check_username'),
    path('login/', sign_in, name='login'),
    path('saveProfileInfo/', saveProfileInfo, name='saveProfileInfo'),
    path('check_old_password/', check_old_password, name='check_old_password'),
    path('guest_login/', guest_login, name='guest_login'),
    path('logout/', sign_out, name='logout'),
    path('changePassword/', changePassword, name='changePassword'),
    path('register/', sign_up, name='register'),
    path('room/<str:roomname>/<str:status>/', createRoom, name='createRoom'),
    path('leave/<str:roomname>/<str:status>/', leaveRoom, name="leaveRoom"),
    path("__reload__/", include("django_browser_reload.urls")),
    path('', home, name="home"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)