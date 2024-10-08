from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('profile_image', 'isGuest')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Chat)