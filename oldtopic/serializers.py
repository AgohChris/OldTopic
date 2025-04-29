from rest_framework import serializers
from .models import *




class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = "__all__"


class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class SuperAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuperAdmin
        fields = "__all__"
       

class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = "__all__"
     

class SuspendreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suspendre
        fields = "__all__"
        

class GererSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gerer
        fields = "__all__"


class TelechargerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Telecharger
        fields = "__all__"
        

class VisualiserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visualiser
        fields = "__all__"


class  SujetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sujet
        fields = "__all__"
       

class  HistoriqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historique
        fields = "__all__"
       