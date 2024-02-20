import graphene
import graphql_jwt
from user.mutation import UserMutation
from user.query import UserQuery
from interest.query import InterestQuery
from interest.mutation import InterestMutation
from chat.mutation import ChatMutation
from chat.query import ChatQuery

class Mutation(UserMutation, InterestMutation, ChatMutation, graphene.ObjectType):
    login_user = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(UserQuery, InterestQuery, ChatQuery, graphene.ObjectType):
    pass

schema = graphene.Schema(mutation=Mutation, query=Query)