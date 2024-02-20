from django.contrib import admin
from interest.models import UserReview, UserInterest, UserContent

admin.site.register(UserReview)
admin.site.register(UserInterest)
admin.site.register(UserContent)
# Register your models here.
