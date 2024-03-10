from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('recommendations/', views.jaccard_recommendations, name='recommendations')
]
