import graphene

class UserType(graphene.ObjectType):
    email = graphene.String()
    username = graphene.String()
    image = graphene.String()

class UserQuery(graphene.ObjectType):
    user_profile = graphene.Field(UserType)

    def resolve_user_profile(self, info):
        if info.context.user:
            return info.context.user

