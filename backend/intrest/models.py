from django.db import models
from uuid import uuid4
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4, editable=False)
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name
    
class Recommendation(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4, editable=False)
    url = models.TextField(default="")
    title = models.TextField(default="")
    preview = models.TextField(default="")
    thumbnail = models.URLField(default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name_plural = 'Recommendations'
    
class Interest(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4, editable=False)
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    recommendations = models.ManyToManyField(to=Recommendation)
    category = models.ForeignKey(Category, related_name='intrests', 
                                 on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('category', 'name',)
        verbose_name_plural = 'Interests'

    def __str__(self):
        return self.name
    
class UserInterest(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, related_name='user_intrests', on_delete=models.CASCADE)
    interests = models.ManyToManyField(Interest)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('user',)
        verbose_name_plural = 'User Intrests'

    def __str__(self):
        return self.user
    
class UserReview(models.Model):
    recommendation = models.ForeignKey(to=Recommendation, on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    review = models.TextField(default="")
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)

    def user_like(self):
        if self.like:
            self.like = False

        else:
            self.like = True
            self.dislike = False

    def user_dislike(self):
        if self.dislike:
            self.dislike = False

        else:
            self.like = False
            self.dislike = True

    def add_review(self, review):
        self.review = review
