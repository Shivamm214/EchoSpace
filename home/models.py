from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    profile_image = models.ImageField(upload_to="profile_pictures/", null=True, blank=True)
    isGuest = models.BooleanField(default=True)

class Chat(models.Model):
    room_name = models.CharField(max_length=255)

    def __str__(self):
        return self.room_name
