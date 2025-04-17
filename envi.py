#!/usr/bin/env python3
import subprocess as sbp
import shutil


NomEnv = input("Comment veut tu nommer ton environnement virtuel : ")

if NomEnv == "":
    NomEnv = "env"

try:
    if not shutil.which("virtualenv"):
        print("installation du module nécessaire...")
        sbp.run(["pip","install","virtualenv"], check=True)
    else:
        sbp.run(["virtualenv", NomEnv], check=True)
        sbp.run(f"source {NomEnv}/bin/activate", 
                shell=True, 
                executable="/bin/bash")
        
        print("Succès")
except sbp.CalledProcessError as ex:
    print(f"Une érreur est survenue lor de l'exécution de {ex}")