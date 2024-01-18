import graphene
from user.models import CustomUser, Connection, ReportedUser

class ErrorType(graphene.ObjectType):
    field = graphene.String()
    message = graphene.String()


class TogglePrivateAccount(graphene.Mutation):

    success = graphene.Boolean()
    message = graphene.String()
    error = graphene.Field(ErrorType)

    def mutate(self, info):
        success = True
        message = ""
        error = None

        if not info.context.user:
            success = False
            message = "User is not authenticated"

        else:
            user = info.context.user
            user.private = not user.private
            user.save()
        
        return TogglePrivateAccount(success=success, message=message, error=error)


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
        username = username.upper()

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
    
class AddConnection(graphene.Mutation):
    class Arguments:
        user_uid = graphene.UUID(required=True)

    success = graphene.Boolean()
    message = graphene.String()
    error = graphene.Field(ErrorType)

    def mutate(self, info, user_uid):
        success = True
        message = ""
        error = None

        user = info.context.user
        connection = CustomUser.objects.get(uid=user_uid)

        if user.uid == user_uid:
            error = ErrorType(field="user_uid", message="You cannot add yourself")
            success = False

        if success:
            try:
                user_connection = Connection.objects.get(connection=connection)
                if user_connection.connection_status == "revoked":
                    user_connection.connection_status = "pending"
                    user_connection.save()
                    message = "Connection request sent successfully"
                else:
                    error = ErrorType(field="user_uid", message="You are already connected")
                    success = False
            except CustomUser.connection.RelatedObjectDoesNotExist:
                user.connection.create(connection=connection, connection_status="pending")
                message = "Connection request sent successfully"

        return AddConnection(success=success, message=message, error=error)

class AcceptConnection(graphene.Mutation):
    class Arguments:
        connection_uid = graphene.UUID(required=True)

    success = graphene.Boolean()
    message = graphene.String()
    error = graphene.Field(ErrorType)

    def mutate(self, info, connection_uid):
        success = True
        message = ""
        error = None

        user = info.context.user
        connection = Connection.objects.get(uid=connection_uid)

        if user.uid != connection.connection.uid:
            error = ErrorType(field="connection_uid", message="You cannot accept this connection")
            success = False
        
        else:
            connection.connection_status = "accepted"
            connection.save()
            message = "Connection accepted successfully"

        return AcceptConnection(success=success, message=message, error=error)

class addReportedUser(graphene.Mutation):
    class Arguments:
        user_uid = graphene.UUID(required=True)
        reason = graphene.String(required=True)


    success = graphene.Boolean()
    message = graphene.String()
    error = graphene.Field(ErrorType)

    def mutate(self, info, user_uid, reason):
        success = True
        message = ""
        error = None

        user = info.context.user
        reported_user = CustomUser.objects.get(uid=user_uid)

        if user.uid == user_uid:
            error = ErrorType(field="user_uid", message="You cannot report yourself")
            success = False

        if success:
            try:
                ReportedUser.objects.get(reported_user=reported_user)
                error = ErrorType(field="user_uid", message="You have already reported this user")
                success = False

            except ReportedUser.DoesNotExist:
                ReportedUser.objects.create(user=reported_user, reporter=user, reason=reason)
                message = "User reported successfully"

        return addReportedUser(success=success, message=message, error=error)
        
class UserMutation(graphene.ObjectType):
    register_user = UserRegister.Field()
    change_password = ChangePassword.Field()
    add_connection = AddConnection.Field()
    accept_connection = AcceptConnection.Field()
    report_user = addReportedUser.Field()
    toggle_private = TogglePrivateAccount.Field()
