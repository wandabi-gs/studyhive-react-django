import pandas as pd
from sklearn.neighbors import NearestNeighbors
from user.models import Connection, CustomUser as User, ReportedUser

def get_user_recommendations(authuser : User) -> list[User]:
    reported_users = ReportedUser.objects.filter(banned=True)
    users = User.objects.all()

    possible_users = [user for user in users if not user in reported_users and user!=authuser]

    return possible_users