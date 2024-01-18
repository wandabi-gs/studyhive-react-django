import graphene
from graphene_django.types import DjangoObjectType
from user.models import ReportedUser, Connection, CustomUser

class UserType(graphene.ObjectType):
    uid = graphene.UUID()
    email = graphene.String()
    username = graphene.String()
    image = graphene.String()
    private = graphene.Boolean()

class ConnectionType(DjangoObjectType):
    user = graphene.Field(UserType)
    connection = graphene.Field(UserType)
    class Meta:
        model = Connection

class ReportedUserType(DjangoObjectType):
    user = graphene.Field(UserType)
    class Meta:
        model = ReportedUser