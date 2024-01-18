import pandas as pd
from sklearn.neighbors import NearestNeighbors
from intrest.models import UserReview, Recommendation
from user.models import Connection, CustomUser

def get_interest_recommendations(user : CustomUser) -> list[Recommendation]:
    user_reviews = pd.DataFrame.from_records(UserReview.objects.filter(user=user).values('user','recommendation__uid', 'like', 'dislike'))

    connection_reviews = pd.DataFrame.from_records(
        UserReview.objects.filter(
            user__uid__in=Connection.objects.filter(connection_status='accepted').values_list('connection__uid', flat=True)
        ).values('user','recommendation__uid', 'like', 'dislike')
    )

    combined_data = pd.concat([user_reviews, connection_reviews])

    combined_data['user_like_count'] = combined_data['like'].astype(int)
    combined_data['user_dislike_count'] = combined_data['dislike'].astype(int)

    features = ['user_like_count', 'user_dislike_count']

    recommender = NearestNeighbors(metric='cosine', algorithm='brute')
    recommender.fit(combined_data[features])

    user_profile = combined_data[combined_data['user'] == user.id][features]
    
    k_neighbors = 5 if len(user_profile) > 5 else len(user_profile)
    # k_neighbors = len(user_profile)
    distances, indices = recommender.kneighbors(user_profile, n_neighbors=k_neighbors)

    recommended_recommendations = Recommendation.objects.filter(
        uid__in=combined_data.iloc[indices[0, 1:]]['recommendation__uid'].values
    )

    return recommended_recommendations
