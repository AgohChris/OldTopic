from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Sujet
from .serializers import SujetSerializer

from django.http import HttpResponse


def home(request):
    return HttpResponse("Bienvenue sur OldTopic !")
