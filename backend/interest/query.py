import graphene
from engines.recommendation import get_interest_recommendations
from interest.types import CategoryType, InterestType, RecommendationType, UserInterestType, UserReviewType, RecommendationNotesType, UserContentType
from interest.models import Category, Interest, Recommendation, UserInterest, UserReview, RecommendationNotes, UserContent
from django.contrib.auth import get_user_model
from user.models import Connection

User = get_user_model()

class InterestQuery(graphene.ObjectType):
    categories = graphene.List(CategoryType)
    category = graphene.Field(CategoryType, category_uid=graphene.UUID())
    # recommendations = graphene.List(RecommendationType, interest_uid=graphene.UUID())
    recommendations = graphene.List(RecommendationType)
    recommendation = graphene.Field(RecommendationType, recommendation_uid=graphene.UUID())
    interest = graphene.Field(InterestType, interest_uid=graphene.UUID())
    user_interest = graphene.Field(UserInterestType, user_uid= graphene.UUID())
    my_interests = graphene.Field(UserInterestType)
    user_review = graphene.Field(UserReviewType, recommendation_uid=graphene.UUID())
    recommendation_reviews = graphene.List(UserReviewType, recommendation_uid=graphene.UUID())
    recommendation_notes = graphene.Field(RecommendationNotesType, recommendation_uid=graphene.UUID())
    my_contents = graphene.List(UserContentType)
    my_content = graphene.Field(UserContentType, content_uid=graphene.UUID())
    user_contents = graphene.List(UserContentType)
    user_content = graphene.Field(UserContentType, content_uid=graphene.UUID())

    def resolve_my_interests(self, info):
        user = info.context.user
        return UserInterest.objects.get(user=user)

    def resolve_categories(self, info):
        return Category.objects.all()
    
    def resolve_category(self, info, category_uid):
        return Category.objects.get(uid=category_uid)
    
    def resolve_recommendations(self, info):
        # interest = Interest.objects.get(uid=interest_uid)
        # return Recommendation.objects.filter(interest=interest)
        if not info.context.user:
            return None
        
        return get_interest_recommendations(info.context.user)
    
    def resolve_recommendation(self, info, recommendation_uid):
        return Recommendation.objects.get(uid=recommendation_uid)
    
    def resolve_interest(self, info, interest_uid):
        return Interest.objects.get(uid=interest_uid)
    
    def resolve_user_interest(self, info, user_uid):
        user = User.objects.get(uid=user_uid)
        interests = []

        try:
            interests = UserInterest.objects.get(user=user)

        except UserInterest. DoesNotExist:
            pass

        return interests
    
    def resolve_user_review(self, info, recommendation_uid):
        user = info.context.user
        if not user:
            return {}
        
        recommendation = Recommendation.objects.get(uid=recommendation_uid)  

        review = None 
        try:     
            review = UserReview.objects.get(recommendation=recommendation, user=user)

        except UserReview.DoesNotExist:
            review = None

        return review
    
    def resolve_recommendation_reviews(self, info, recommendation_uid):
        recommendation = Recommendation.objects.get(uid=recommendation_uid)  

        reviews = UserReview.objects.filter(recommendation=recommendation)

        return reviews
    
    def resolve_recommendation_notes(self, info, recommendation_uid):
        recommendation = Recommendation.objects.get(uid=recommendation_uid)  

        try:
            notes = RecommendationNotes.objects.get(recommendation=recommendation)

        except RecommendationNotes.DoesNotExist:
            notes = None

        return notes

    def resolve_my_contents(self, info):
        user = info.context.user
        if not user:
            return None
        
        return UserContent.objects.filter(user=user)
    
    def resolve_my_content(self, info, content_uid):
        user = info.context.user
        if not user:
            return None
        
        return UserContent.objects.get(uid=content_uid, user=user)
    
    def resolve_user_contents(self, info):
        user = info.context.user
        if not user:
            return None
        
        connection_user = list(Connection.objects.filter(user=user, status="accepted").values_list('connection_uid', flat=True))
        user_connection = list(Connection.objects.filter(connection=user, status="accepted").values_list('user__uid', flat=True))
        connections = connection_user + user_connection
        return UserContent.objects.filter(user__uid__in=connections)

    
    def resolve_user_content(self, info, content_uid):
        user = info.context.user
        if not user:
            return None
        
        return UserContent.objects.get(uid=content_uid)
    
        
    
