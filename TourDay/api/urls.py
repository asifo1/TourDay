from django.urls import path, include
from api import auth, profile
from user_profile.views import PostList
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name="api/doc.html")),
    path('auth/', include('rest_auth.urls')),
    path('auth/signup/', auth.Signup.as_view()),
    path('profile/', profile.ProfileView.as_view()),
    path('get_posts/<str:username>', PostList.as_view())

]
