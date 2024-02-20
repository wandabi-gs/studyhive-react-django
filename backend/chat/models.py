from django.db import models
from uuid import uuid4
from django.contrib.auth import get_user_model
from interest.models import Interest

User = get_user_model()

class UserGroup(models.Model):
    uid = models.UUIDField(default=uuid4, unique=True)
    name = models.CharField(max_length=50)
    private = models.BooleanField(default=False)
    interests = models.ManyToManyField(Interest, related_name="group_interests")
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "User Group"
        verbose_name_plural = "User Groups"
        ordering = ["-created_at"]

roles = [
    ('admin', 'admin'),
    ('member', 'member')
]

class GroupMember(models.Model):
    uid = models.UUIDField(default=uuid4, unique=True)
    group = models.ForeignKey(UserGroup,on_delete=models.CASCADE)
    member = models.ForeignKey(User,related_name="group_member",on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=roles, default='member')
    allowed = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.group.name} - {self.member.email}"
    class Meta:
        verbose_name = "Group Member"
        verbose_name_plural = "Group Members"
        ordering = ["-created_at"]