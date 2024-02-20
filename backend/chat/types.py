from graphene_django.types import DjangoObjectType
from chat.models import UserGroup, GroupMember

class UserGroupType(DjangoObjectType):
    class Meta:
        model = UserGroup

class GroupMemberType(DjangoObjectType):
    class Meta:
        model = GroupMember


