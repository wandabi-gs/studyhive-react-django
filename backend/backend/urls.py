from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static
from allauth.socialaccount import views as socialaccount_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    # path('accounts/social/login/callback/', socialaccount_views.SignupForm),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += [
#     re_path(r'^.*$', TemplateView.as_view(template_name='index.html'))
# ]