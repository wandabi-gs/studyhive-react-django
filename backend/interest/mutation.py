import graphene
from interest.types import RecommendationType, InterestType, CategoryType, UserInterestType
from interest.models import Recommendation, Interest, Category, UserInterest, UserReview

class ErrorType(graphene.ObjectType):
    field = graphene.String()
    message = graphene.String()

class AddUserInterest(graphene.Mutation):
    class Arguments:
        interestUid = graphene.UUID()

    success = graphene.Boolean()

    def mutate(self, info, interestUid):
        success = True
        user = info.context.user

        userIntrest, created = UserInterest.objects.get_or_create(user=user)
        userIntrest.interests.add(Interest.objects.get(uid=interestUid))

        return AddUserInterest(success=success)
    
class RemoveUserInterest(graphene.Mutation):
    class Arguments:
        interestUid = graphene.UUID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, interestUid):
        success = True
        user = info.context.user

        UserInterest.objects.get(user=user).interests.remove(Interest.objects.get(uid=interestUid))

        return RemoveUserInterest(success=success)
    
class ClearUserInterest(graphene.Mutation):
    success = graphene.Boolean()

    def mutate(self, info):
        success = True
        user = info.context.user

        UserInterest.objects.get(user=user).interests.clear()

        return ClearUserInterest(success=success)

class UserLikeRecommendation(graphene.Mutation):
    class Arguments:
        recommendationUid = graphene.UUID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, recommendationUid):
        success = True
        user = info.context.user
        recommendation = Recommendation.objects.get(uid=recommendationUid)
        userReview, created = UserReview.objects.get_or_create(user=user,recommendation=recommendation)
        userReview.user_like()

        return UserLikeRecommendation(success=success)

class UserDisLikeRecommendation(graphene.Mutation):
    class Arguments:
        recommendationUid = graphene.UUID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, recommendationUid):
        success = True
        user = info.context.user
        recommendation = Recommendation.objects.get(uid=recommendationUid)
        userReview, created = UserReview.objects.get_or_create(user=user,recommendation=recommendation)
        
        userReview.user_dislike()

        return UserDisLikeRecommendation(success=success)

class UserAddReview(graphene.Mutation):
    class Arguments:
        recommendationUid = graphene.UUID(required=True)
        review = graphene.String()

    success = graphene.Boolean()

    def mutate(self, info, recommendationUid, review):
        success = True
        user = info.context.user
        recommendation = Recommendation.objects.get(uid=recommendationUid)
        userReview, created = UserReview.objects.get_or_create(user=user,recommendation=recommendation)

        userReview.add_review(review=review)

        return UserAddReview(success=success)
    
class InterestMutation(graphene.ObjectType):
    add_interest = AddUserInterest.Field()
    remove_interest = RemoveUserInterest.Field()
    clear_interest = ClearUserInterest.Field()
    like_recommendation = UserLikeRecommendation.Field()
    dislike_recommendation = UserDisLikeRecommendation.Field()
    add_review = UserAddReview.Field()


