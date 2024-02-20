import graphene
from django.contrib.auth import get_user_model
from user.types import ConnectionType, ReportedUserType, UserType
from user.models import Connection, ReportedUser
from engines.user import get_user_recommendations
from django.db.models import Q

User = get_user_model()

class UserQuery(graphene.ObjectType):
    user_profile = graphene.Field(UserType)
    users = graphene.List(UserType)
    user = graphene.Field(UserType , user_uid=graphene.UUID(required=True))
    connections = graphene.List(ConnectionType)
    connection = graphene.Field(ConnectionType, connection_uid=graphene.UUID(required=True))
    recommended_users = graphene.List(UserType)
    reported_users = graphene.List(ReportedUserType)
    reported_user = graphene.Field(ReportedUserType, user_uid=graphene.UUID(required=True))

    def resolve_user_profile(self, info):
        if not info.context.user:
            return None
        
        return info.context.user
        
    def resolve_users(self, info):
        if not info.context.user:
            return None
        
        return User.objects.filter(private=False)
        
    def resolve_user(self, info, user_uid):
        if not info.context.user:
            return None
        
        try:
            return User.objects.get(uid=user_uid)
        
        except User.DoesNotExist:
            return None
    
    def resolve_connections(self, info):
        if not info.context.user:
            return None
        
        return Connection.objects.filter((Q(user=info.context.user) | Q(connection=info.context.user)), ~Q(connection_status="revoked"))
    
    def resolve_recommended_users(self, info):
        if not info.context.user:
            return None

        return get_user_recommendations(info.context.user)

    def resolve_connection(self, info, connection_uid):
        if not info.context.user:
            return None
        
        try:
            return Connection.objects.get(user=info.context.user, uid=connection_uid)
        
        except Connection.DoesNotExist:
            return None
    

    def resolve_reported_users(self, info):
        if not info.context.user:
            return None
        
        return ReportedUser.objects.filter(reporter=info.context.user)

    def resolve_reported_user(self, info, user_uid):
        if not info.context.user:
            return None
        
        try:
            return ReportedUser.objects.get(user__uid=user_uid, reporter=info.context.user)
        
        except ReportedUser.DoesNotExist:
            return None
            


