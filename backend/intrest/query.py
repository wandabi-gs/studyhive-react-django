import graphene
from intrest.types import CategoryType, InterestType, RecommendationType, UserInterestType
from intrest.models import Category, Interest, Recommendation, UserInterest

class InterestQuery(graphene.ObjectType):
    categories = graphene.List(CategoryType)
    category = graphene.Field(CategoryType, category_uid=graphene.UUID())
    recommendations = graphene.List(RecommendationType, interest_uid=graphene.UUID())
    recommendation = graphene.Field(RecommendationType, recommendation_uid=graphene.UUID())
    interest = graphene.Field(InterestType, interest_uid=graphene.UUID())
    user_interest = graphene.Field(UserInterestType, user_uid= graphene.UUID())
    my_interests = graphene.Field(UserInterestType)

    def resolve_my_interests(self, info):
        user = info.context.user
        return UserInterest.objects.get(user=user)

    def resolve_categories(self, info):
        return Category.objects.all()
    
    def resolve_category(self, info, category_uid):
        return Category.objects.get(uid=category_uid)
    
    def resolve_recommendations(self, info, interest_uid):
        interest = Interest.objects.get(uid=interest_uid)
        return Recommendation.objects.filter(interest=interest)
    
    def resolve_recommendation(self, info, recommendation_uid):
        return Recommendation.objects.get(uid=recommendation_uid)
    
    def resolve_interest(self, info, interest_uid):
        return Interest.objects.get(uid=interest_uid)
    
    def resolve_user_interest(self, info):
        user = info.context.user
        interests = []

        try:
            interests = UserInterest.objects.get(user=user)

        except UserInterest. DoesNotExist:
            pass

        return interests
        
