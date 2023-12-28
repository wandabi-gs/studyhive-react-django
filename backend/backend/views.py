from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter, OAuth2LoginView

class GoogleLoginView(OAuth2LoginView):
    adapter_class = GoogleOAuth2Adapter
