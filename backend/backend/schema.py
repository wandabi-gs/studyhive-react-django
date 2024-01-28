import graphene
import graphql_jwt
from user.mutation import UserMutation
from user.query import UserQuery
from interest.query import InterestQuery
from interest.mutation import InterestMutation
# from allauth.socialaccount.models import SocialToken, SocialAccount
from graphql_jwt.decorators import login_required

# class SocialAuthMutation(graphene.Mutation):
#     class Arguments:
#         provider = graphene.String(required=True)
#         access_token = graphene.String(required=True)

#     success = graphene.Boolean()

#     @classmethod
#     @login_required
#     def mutate(cls, root, info, provider, access_token):
#         try:
#             SocialToken.objects.create(
#                 account=info.context.user.socialaccount_set.get(provider=provider),
#                 token=access_token
#             )
#             success = True
#         except Exception as e:
#             print(str(e))
#             success = False

#         return cls(success=success)

class Mutation(UserMutation, InterestMutation, graphene.ObjectType):
    # social_auth = SocialAuthMutation.Field()
    login_user = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(UserQuery, InterestQuery, graphene.ObjectType):
    pass

schema = graphene.Schema(mutation=Mutation, query=Query)