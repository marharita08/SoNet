from django.urls import path
from . import views

urlpatterns = [
    path('recommendations/', views.jaccard_recommendations, name='recommendations')
]
