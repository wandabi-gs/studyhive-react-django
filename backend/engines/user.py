import pandas as pd
from sklearn.neighbors import NearestNeighbors
from user.models import Connection, CustomUser as User, ReportedUser

def get_user_recommendations(authuser : User) -> list[User]:
    reported_users = list(ReportedUser.objects.filter(banned=True).values("user__uid"))

    user_connections = Connection.objects.filter(
        user=authuser,
        connection_status='accepted'
    ).values_list('connection', flat=True)

    possible_users = User.objects.filter(
        is_staff=False
    ).exclude(
        uid=authuser.uid
    ).exclude(
        uid__in=reported_users
    ).exclude(
        uid__in=user_connections
    ).distinct()

    if user_connections:
        users_data = pd.DataFrame.from_records(
            User.objects.filter(uid__in=user_connections).values('uid', 'email')
        )
        
        recommender = NearestNeighbors(metric='cosine', algorithm='brute')
        recommender.fit(users_data['uid'].values.reshape(-1, 1))

        user_profile = authuser.uid.reshape(1, -1)
        _, indices = recommender.kneighbors(user_profile, n_neighbors=len(possible_users))

        possible_users = [possible_users[index] for index in indices[0]]

    return possible_users