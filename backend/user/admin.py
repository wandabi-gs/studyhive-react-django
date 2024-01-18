from django.contrib import admin
from user.models import CustomUser, Connection

admin.site.register(CustomUser)
admin.site.register(Connection)