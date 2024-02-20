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
    
rec_sources = [
    ['books', 'books'],
    ['youtube', 'youtube']
]

class Recommendation(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4, editable=False)
    url = models.TextField(default="")
    title = models.TextField(default="")
    video_id = models.CharField(max_length=20, null=True, blank=True)
    source = models.CharField(max_length=20, default='books', choices=rec_sources)
    thumbnail = models.URLField(default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name_plural = 'Recommendations'

    def __str__(self):
        return self.title
    
class UserRecommendation(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, related_name='user_recommendations', on_delete=models.CASCADE)
    title = models.TextField(default="")
    thumbnail = models.ImageField(upload_to='video/thumbnail/', null=True, blank=True)
    video = models.FileField(upload_to='video/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name_plural = 'Recommendations'

    def __str__(self):
        return self.title


class RecommendationNotes(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, related_name='user_notes', on_delete=models.CASCADE)
    recommendation = models.ForeignKey(Recommendation, related_name='recommendation_notes', on_delete=models.CASCADE)
    notes = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name_plural = 'Recommendation Notes'

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
        ordering = ('id',)
        verbose_name_plural = 'User Intrests'

    def __str__(self):
        return self.user.email
    
class UserReview(models.Model):
    recommendation = models.ForeignKey(to=Recommendation, on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    review = models.TextField(default="")
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    def user_like(self):
        self.like = True
        self.dislike = False

        self.save()

    def user_dislike(self):
        self.like = False
        self.dislike = True
        self.save()

    def add_review(self, review):
        self.review = review
        self.save()

    def __str__(self):
        return self.user.email
    


uploads = [
    ['video', 'video'],
    ['pdf', 'pdf']
]

def defaultInterest():
    return Interest.objects.get(id=40)
class UserContent(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4, editable=False)
    interest = models.ForeignKey(Interest, related_name='user_content', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='user_content', on_delete=models.CASCADE)
    title = models.TextField(default="")
    description = models.TextField(default="")
    content = models.FileField(upload_to='user_content/', null=True, blank=True)
    content_type = models.CharField(max_length=10, default='video', choices=uploads)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name_plural = 'User Content'

    def __str__(self):
        return self.title
        