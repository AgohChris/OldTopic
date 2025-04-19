#!/usr/bin/env python3

import subprocess as sbp
import datetime as dt


commit_message = input("Un méssage pour le commit ? : ")
remote_link = input("git remote add origin : ")

if commit_message == "":
    commit_message = f"first auto commit : {dt.datetime.now().strftime('%d-%m-%Y à %H:%M:%S')}" 

while remote_link == "":
    remote_link = input("Attention vous devez Entrer le lien : ")

try:
    sbp.run(["git", "init"], check=True)
    sbp.run(["git", "add", "."], check=True)
    sbp.run(["git", "commit", "-m", commit_message], check=True)
    sbp.run(["git", "branch", "-M", "main"], check=True)
    sbp.run(["git", "remote", "add", "origin", remote_link], check=True)
    sbp.run(["git", "push", "-u", "origin", "main"], check=True)
    
    
    print(f"Succès Inittalisation réussis sur la branche 'main' message : {commit_message} ")

except sbp.CalledProcessError as e:
    print(f"Erreur lors de l'exécution : {e}")