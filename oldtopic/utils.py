import random as rd
import string


def generation_mdp(longueur=12):
    caract = string.ascii_letters + string.digits
    generer = rd.choices(caract, k=longueur)
    print(generer)
    return ''.join(generer)