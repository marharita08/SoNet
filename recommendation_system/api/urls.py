from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('profile/', views.jaccard_content, name='profile'),
    path('likes/', views.jaccard_collaborative, name='likes'),
    path('friends/', views.jaccard_topology, name='friends')
]
