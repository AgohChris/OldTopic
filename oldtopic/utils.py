import random as rd
import string
import os
from django.contrib.auth.tokens import PasswordResetTokenGenerator

def generation_mdp(longueur=12):
    caract = string.ascii_letters + string.digits
    generer = rd.choices(caract, k=longueur)
    print(generer)
    return ''.join(generer)


def genererCodeVerif():
    code = rd.randint(111111, 999999)
    print(code)
    return code


def genererCodeReinitilisation():
    codereinit = rd.randint(111111, 999999)
    print(codereinit)
    return codereinit



# Pour Genérer directement des chemin de stockage poour les différents fichier et photo
def sujet_upload_path(instance, filename):
    return os.path.join(
        'sujets',
        instance.matiere,
        instance.type,
        filename
    )


def corriger_upload_path(instance, filename):
    return os.path.join(
        'corriges',
        instance.matiere,
        instance.type,
        filename
    )


def photo_upload_path(instance, filename):
    return os.path.join(
        'photos',
        instance.username,
        filename
    )



class PasswordResetToken(PasswordResetTokenGenerator):
    pass

password_reset_token = PasswordResetToken()

