import graphene
from user.mutation import ErrorType
from chat.models import UserGroup, GroupMember
from chat.types import UserGroupType, GroupMemberType

class CreateGroup(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String()
        private = graphene.Boolean()
    
    group = graphene.Field(UserGroupType)
    success = graphene.Boolean()
    error = graphene.String()
    
    def mutate(self, info, name, description, private):
        user = info.context.user
        if user.is_anonymous:
            return CreateGroup(group=None, success=False, error="You must be logged in to create a group")
        
        try:
            UserGroup.objects.get(name__iexact=name)
            return CreateGroup(group=None, success=False, error="A group with this name already exists")
        
        except UserGroup.DoesNotExist:
            group = UserGroup.objects.create(name=name, description=description, private=private)
            GroupMember.objects.create(group=group, member=user, role="admin")
            return CreateGroup(group=group, success=True, error=None)
    
class JoinGroup(graphene.Mutation):
    class Arguments:
        groupUid = graphene.UUID(required=True)
    
    group = graphene.Field(UserGroupType)
    error = graphene.String()
    success = graphene.Boolean()
    
    def mutate(self, info, groupUid):
        user = info.context.user
        if user.is_anonymous:
            return JoinGroup(error="You must be logged in to join a group")
        group = UserGroup.objects.get(uid=groupUid)
        if group.members.filter(uid=user.uid).exists():
            return JoinGroup(group=None, success=False, error="You are already a member of this group")
        
        if group.private:
            GroupMember.objects.create(group=group, member=user, allowed=False)

        else:
            GroupMember.objects.create(group=group, member=user)

        return JoinGroup(group=group, success=True, error=None)
    
class LeaveGroup(graphene.Mutation):
    class Arguments:
        groupUid = graphene.UUID(required=True)
    
    group = graphene.Field(UserGroupType)
    error = graphene.String()
    success = graphene.Boolean()
    
    def mutate(self, info, groupUid):
        user = info.context.user
        if user.is_anonymous:
            return LeaveGroup(error="You must be logged in to leave a group", success=False, group=None)
        group = UserGroup.objects.get(uid=groupUid)
        member = group.members.filter(uid=user.uid)
        if not member.exists():
            return LeaveGroup(error="You are not a member of this group", success=False, group=None)
        
        member.delete()
        return LeaveGroup(group=group, success=True, error=None)
    
class AllowMember(graphene.Mutation):
    class Arguments:
        groupUid = graphene.UUID(required=True)
        memberUid = graphene.UUID(required=True)
    
    group = graphene.Field(UserGroupType)
    error = graphene.String()
    success = graphene.Boolean()
    
    def mutate(self, info, groupUid, memberUid):
        user = info.context.user
        if user.is_anonymous:
            return AllowMember(error="You must be logged in to allow a member", success=False, group=None)
        group = UserGroup.objects.get(uid=groupUid)

        try:
            GroupMember.objects.get(member=user, group=group, role="admin")

        except GroupMember.DoesNotExist:
            return AllowMember(error="You must be the admin of the group to allow a member", success=False, group=None)
        
        member = group.members.filter(uid=memberUid)
        if not member.exists():
            return AllowMember(error="This user is not a member of this group", success=False, group=None)
        
        member = member.first()
        member.allowed = True
        member.save()
        return AllowMember(group=group, success=True, error=None)
    
class KickMember(graphene.Mutation):
    class Arguments:
        groupUid = graphene.UUID(required=True)
        memberUid = graphene.UUID(required=True)
    
    group = graphene.Field(UserGroupType)
    error = graphene.String()
    success = graphene.Boolean()
    
    def mutate(self, info, groupUid, memberUid):
        user = info.context.user
        if user.is_anonymous:
            return KickMember(error="You must be logged in to kick a member", success=False, group=None)
        group = UserGroup.objects.get(uid=groupUid)

        try:
            GroupMember.objects.get(member=user, group=group, role="admin")

        except GroupMember.DoesNotExist:
            return KickMember(error="You must be the admin of the group to kick a member", success=False, group=None)
        
        member = group.members.filter(uid=memberUid)
        if not member.exists():
            return KickMember(error="This user is not a member of this group", success=False, group=None)
        
        member.delete()
        return KickMember(group=group, success=True, error=None)
    
class MakeAdmin(graphene.Mutation):
    class Arguments:
        groupUid = graphene.UUID(required=True)
        memberUid = graphene.UUID(required=True)
    
    group = graphene.Field(UserGroupType)
    error = graphene.String()
    success = graphene.Boolean()
    
    def mutate(self, info, groupUid, memberUid):
        user = info.context.user
        if user.is_anonymous:
            return MakeAdmin(error="You must be logged in to make a member an admin", success=False, group=None)
        group = UserGroup.objects.get(uid=groupUid)

        try:
            GroupMember.objects.get(member=user, group=group, role="admin")

        except GroupMember.DoesNotExist:
            return MakeAdmin(error="You must be the admin of the group to make a member an admin", success=False, group=None)
        
        member = group.members.filter(uid=memberUid)
        if not member.exists():
            return MakeAdmin(error="This user is not a member of this group", success=False, group=None)
        
        member = member.first()
        member.role = "admin"
        member.save()
        return MakeAdmin(group=group, success=True, error=None)
    
class RemoveAdmin(graphene.Mutation):
    class Arguments:
        groupUid = graphene.UUID(required=True)
        memberUid = graphene.UUID(required=True)
    
    group = graphene.Field(UserGroupType)
    error = graphene.String()
    success = graphene.Boolean()
    
    def mutate(self, info, groupUid, memberUid):
        user = info.context.user
        if user.is_anonymous:
            return RemoveAdmin(error="You must be logged in to remove a member as an admin", success=False, group=None)
        group = UserGroup.objects.get(uid=groupUid)

        try:
            GroupMember.objects.get(member=user, group=group, role="admin")

        except GroupMember.DoesNotExist:
            return RemoveAdmin(error="You must be the admin of the group to remove a member as an admin", success=False, group=None)
        
        member = group.members.filter(uid=memberUid)
        if not member.exists():
            return RemoveAdmin(error="This user is not a member of this group", success=False, group=None)
        
        member = member.first()
        member.role = "member"
        member.save()
        return RemoveAdmin(group=group, success=True, error=None)

class ChatMutation(graphene.ObjectType):
    create_group = CreateGroup.Field()
    join_group = JoinGroup.Field()
    leave_group = LeaveGroup.Field()
    allow_member = AllowMember.Field()
    kick_member = KickMember.Field()
    make_admin = MakeAdmin.Field()
    remove_admin = RemoveAdmin.Field()