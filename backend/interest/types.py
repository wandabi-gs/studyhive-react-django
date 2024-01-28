from graphene_django.types import DjangoObjectType
from interest.models import Category, Interest, Recommendation, UserInterest, UserReview

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category

class InterestType(DjangoObjectType):
    class Meta:
        model = Interest

class RecommendationType(DjangoObjectType):
    class Meta:
        model = Recommendation

class UserInterestType(DjangoObjectType):
    class Meta:
        model = UserInterest

class UserReviewType(DjangoObjectType):
    class Meta:
        model = UserReview


