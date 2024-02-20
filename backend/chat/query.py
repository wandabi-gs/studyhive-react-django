import graphene
from django.contrib.auth import get_user_model
from chat.models import UserGroup, GroupMember
from chat.types import UserGroupType, GroupMemberType
from django.db.models import Q

User = get_user_model()

class ChatQuery(graphene.ObjectType):
    groups = graphene.List(UserGroupType)
    group = graphene.Field(UserGroupType, uid=graphene.UUID())
    group_members = graphene.List(GroupMemberType, group_uid=graphene.UUID())
    user_groups = graphene.List(UserGroupType)

    def resolve_groups(self, info):
        user = info.context.user
        if user.is_anonymous:
            return []
        
        membership = GroupMember.objects.filter(member=user).values("group__uid")
        return UserGroup.objects.filter(~Q(uid__in=membership))

    
    def resolve_group(self, info, uid):
        return UserGroup.objects.get(uid=uid)
    
    def resolve_group_members(self, info, group_uid):
        return GroupMember.objects.filter(group__uid=group_uid)
    
    def resolve_user_groups(self, info):
        user = info.context.user
        membership = GroupMember.objects.filter(member=user)
        return [m.group for m in membership] if membership.exists() else []