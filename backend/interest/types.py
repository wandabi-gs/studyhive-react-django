from graphene_django.types import DjangoObjectType
from interest.models import Category, Interest, Recommendation, RecommendationNotes, UserInterest, UserReview, UserContent
import graphene
from user.types import UserType

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
    user = graphene.Field(UserType)
    class Meta:
        model = UserReview

class RecommendationNotesType(DjangoObjectType):
    class Meta:
        model = RecommendationNotes

class UserContentType(DjangoObjectType):
    class Meta:
        model = UserContent



