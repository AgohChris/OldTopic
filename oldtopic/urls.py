from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('subjects/', SujetListView.as_view(), name='sujet-list'),
    path('subjects/<int:pk>/', SujetDetailView.as_view(), name='sujet-detail'),
]