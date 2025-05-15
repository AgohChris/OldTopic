import platform

def detect_os():
    os_name = platform.system()
    if os_name == "Windows":
        print("Vous êtes sur Windows.")
    elif os_name == "Darwin":
        print("Vous êtes sur macOS.")
    elif os_name == "Linux":
        print("Vous êtes sur Linux.")
    else:
        print("Système d'exploitation inconnu.")

detect_os()