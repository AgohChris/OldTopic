from .models import *
from .serializers import *
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


def home(request):
    return HttpResponse("Bienvenue sur OldTopic !")



# Authentification & Gestion des Comptes
# class login_view(APIView):
#     def post(self, request):


#         return Response({"message": "Login endpoint"}, status=status.HTTP_200_OK)


class EtudiantRegistrationView(APIView):
    def post(self, request):
        serializers = EtudiantRegistrationSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response({"message": "Inscripton reussie"})
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


# class admin_register_view(APIView):
#     def post(self, request):
#         return Response({"message": "Admin register endpoint"}, status=status.HTTP_201_CREATED)
#
#
# class reset_request_view(APIView):
#     def post(self, request):
#         return Response({"message": "Password reset request endpoint"}, status=status.HTTP_200_OK)
#
#
# class reset_confirm_view(APIView):
#     def post(self, request):
#         return Response({"message": "Password reset confirm endpoint"}, status=status.HTTP_200_OK)
#
# class password_change_view(APIView):
#     def put(self, request):
#         return Response({"message": "Password change endpoint"}, status=status.HTTP_200_OK)
#
# class auth_profile_view(APIView):
#     def get(self, request):
#         return Response({"message": "Profile endpoint"}, status=status.HTTP_200_OK)
#
# class auth_profile_update_view(APIView):
#     def put(self, request):
#         return Response({"message": "Profile update endpoint"}, status=status.HTTP_200_OK)
#
# # Gestion des Sujets & Corrigés
# class SujetListView(APIView):
#     def get(self, request):
#         return Response({"message": "List of subjects"}, status=status.HTTP_200_OK)
#
#     def post(self, request):
#         return Response({"message": "Sujet created"}, status=status.HTTP_201_CREATED)
#
# class SujetDetailView(APIView):
#     def get(self, request, id):
#         return Response({"message": f"Details of sujet {id}"}, status=status.HTTP_200_OK)
#
#     def put(self, request, id):
#         return Response({"message": f"Sujet {id} updated"}, status=status.HTTP_200_OK)
#
#     def delete(self, request, id):
#         return Response({"message": f"Sujet {id} deleted"}, status=status.HTTP_204_NO_CONTENT)
#
# class sujet_download_view(APIView):
#     def get(self, request, id):
#         return Response({"message": f"Download sujet {id}"}, status=status.HTTP_200_OK)
#
# class sujet_view_view(APIView):
#     def get(self, request, id):
#         return Response({"message": f"View sujet {id}"}, status=status.HTTP_200_OK)
#
# # Statistiques & Historique
# class stats_view(APIView):
#     def get(self, request):
#         return Response({"message": "Stats endpoint"}, status=status.HTTP_200_OK)
#
# class history_view(APIView):
#     def get(self, request):
#         return Response({"message": "History endpoint"}, status=status.HTTP_200_OK)
#
# class student_history_view(APIView):
#     def get(self, request, id):
#         return Response({"message": f"History of student {id}"}, status=status.HTTP_200_OK)
#
# # Gestion des Étudiants
# class student_list_view(APIView):
#     def get(self, request):
#         return Response({"message": "List of students"}, status=status.HTTP_200_OK)
#
# class student_detail_view(APIView):
#     def get(self, request, id):
#         return Response({"message": f"Details of student {id}"}, status=status.HTTP_200_OK)
#
# class student_suspend_view(APIView):
#     def put(self, request, id):
#         return Response({"message": f"Student {id} suspended"}, status=status.HTTP_200_OK)
#
# class student_reactivate_view(APIView):
#     def put(self, request, id):
#         return Response({"message": f"Student {id} reactivated"}, status=status.HTTP_200_OK)
#
# # Gestion des Administrateurs
# class admin_list_view(APIView):
#     def get(self, request):
#         return Response({"message": "List of admins"}, status=status.HTTP_200_OK)
#
# class admin_suspend_view(APIView):
#     def put(self, request, id):
#         return Response({"message": f"Admin {id} suspended"}, status=status.HTTP_200_OK)
#
# class admin_reactivate_view(APIView):
#     def put(self, request, id):
#         return Response({"message": f"Admin {id} reactivated"}, status=status.HTTP_200_OK)
#
# # Gestion des Matières & Filières
# class matieres_list_view(APIView):
#     def get(self, request):
#         return Response({"message": "List of matieres"}, status=status.HTTP_200_OK)
#
# class matieres_add_view(APIView):
#     def post(self, request):
#         return Response({"message": "Matiere added"}, status=status.HTTP_201_CREATED)
#
# class filieres_list_view(APIView):
#     def get(self, request):
#         return Response({"message": "List of filieres"}, status=status.HTTP_200_OK)
#
# class filieres_add_view(APIView):
#     def post(self, request):
#         return Response({"message": "Filiere added"}, status=status.HTTP_201_CREATED)