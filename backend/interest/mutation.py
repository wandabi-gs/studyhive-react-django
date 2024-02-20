import graphene
from graphene_file_upload.scalars import Upload
from interest.types import RecommendationType, InterestType, CategoryType, UserInterestType, UserReviewType, UserContentType, RecommendationNotesType
from interest.models import Recommendation, Interest, Category, UserInterest, UserReview, UserContent, RecommendationNotes

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
    
class UserDeleteReview(graphene.Mutation):
    class Arguments:
        recommendationUid = graphene.UUID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, recommendationUid):
        success = True
        user = info.context.user
        recommendation = Recommendation.objects.get(uid=recommendationUid)
        userReview = UserReview.objects.get(user=user,recommendation=recommendation)

        userReview.delete()

        return UserDeleteReview(success=success)
    
class UploadContent(graphene.Mutation):
    class Arguments:
        upload = Upload(required=True)
        interest = graphene.UUID(required=True)
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        content_type = graphene.String(required=True)

    success = graphene.Boolean()
    error = graphene.String()
    content = graphene.Field(UserContentType)

    def mutate(self, info, upload, interest, title, description, content_type):
        success = True
        error = None
        content = None
        user = info.context.user
        print(content_type)

        try:
            userInterest = UserInterest.objects.get(user=user, interests__uid=interest)
            contentInterest = Interest.objects.get(uid=interest)
            try:
                content = UserContent.objects.create(user=user, title=title, description=description, content_type=content_type, content=upload, interest=contentInterest)

            except Exception as e:
                success = False
                error = str(e)

        except UserInterest.DoesNotExist:
            success = False
            error = "You must have the interest to upload content"

        return UploadContent(success=success, error=error, content=content)
    
class AddRecommendationNotes(graphene.Mutation):
    class Arguments:
        recommendationUid = graphene.UUID(required=True)
        notes = graphene.String(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, recommendationUid, notes):
        success = True
        error = None
        user = info.context.user

        try:
            recommendation = Recommendation.objects.get(uid=recommendationUid)
            try:
                rnotes = RecommendationNotes.objects.get(user=user, recommendation=recommendation)
                rnotes.notes = notes
                rnotes.save()
            
            except RecommendationNotes.DoesNotExist:
                RecommendationNotes.objects.create(user=user, recommendation=recommendation, notes=notes)

        except Exception as e:
            success = False
            error = str(e)

        return AddRecommendationNotes(success=success, error=error)
    
class InterestMutation(graphene.ObjectType):
    add_interest = AddUserInterest.Field()
    remove_interest = RemoveUserInterest.Field()
    clear_interest = ClearUserInterest.Field()
    like_recommendation = UserLikeRecommendation.Field()
    dislike_recommendation = UserDisLikeRecommendation.Field()
    add_review = UserAddReview.Field()
    delete_review = UserDeleteReview.Field()
    upload_content = UploadContent.Field()
    add_recommendation_notes = AddRecommendationNotes.Field()


