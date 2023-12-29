import graphene
from user.models import CustomUser

class ErrorType(graphene.ObjectType):
    field = graphene.String()
    message = graphene.String()

class ChangePassword(graphene.Mutation):
    class Arguments:
        old_password = graphene.String()
        new_password = graphene.String()

    success = graphene.Boolean()
    message = graphene.String()
    error = graphene.Field(ErrorType)


    def mutate(self, info, old_password, new_password):
        success = True
        message = ""
        error = None

        if len(old_password) == 0:
            error = ErrorType(field="old_password", message="Old password field cannot be empty")
            success = False

        if success and len(new_password) == 0:
            error = ErrorType(field="new_password", message="New password field cannot be empty")
            success = False

        if success:
            user = info.context.user
            if user.check_password(old_password):
                if len(new_password) < 8:
                    error = ErrorType(field="new_password", message="Password must contain at least 8 characters")
                    success = False
                else:
                    user.set_password(new_password)
                    user.save()
                    message = "Password changed successfully"
            else:
                error = ErrorType(field="old_password", message="Old password is incorrect")
                success = False

        return ChangePassword(success=success, message=message, error=error)

class UserRegister(graphene.Mutation):
    class Arguments:
        email = graphene.String()
        username = graphene.String()
        image = graphene.String(required=False)
        password = graphene.String()

    success = graphene.Boolean()
    message = graphene.String()
    error = graphene.Field(ErrorType)

    def mutate(self, info, email, username, password):
        success = True
        message = ""
        error = None

        if len(email) == 0:
            error = ErrorType(field="email", message="Email field cannot be empty")
            success = False

        if success and len(username) == 0:
            error = ErrorType(field="username", message="Username field cannot be empty")
            success = False

        if success:
            try:
                CustomUser.objects.get(email=email)
                error = ErrorType(field="email", message="This email is already registered")
                success = False
            except CustomUser.DoesNotExist:
                if len(password) < 8:
                    error = ErrorType(field="password", message="Password must contain at least 8 characters") # type: ignore
                    success = False
                else:
                    #username to be uppercase
                    user = CustomUser(email=email, username=username.upper())
                    user.set_password(password)
                    user.save()
                    message = "Account created successfully"

        return UserRegister(success=success, message=message, error=error) # type: ignore
    
class UserMutation(graphene.ObjectType):
    register_user = UserRegister.Field()
