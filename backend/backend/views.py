# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter, OAuth2LoginView
from user.models import CustomUser as user
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

class UpdateProfile(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print(request.user)
