from django.core.exceptions import ValidationError
import re

class StrongPasswordValidator:
    def validate(self, password, user=None):
        if len(password) < 8:
            raise ValidationError("Le mot de passe doit avoir au moins 8 caractères.")
        
        if not re.search(r'[A-Z]', password):
            raise ValidationError("Le mot de passe doit contenir au moin une lettre majuscule")
        
        if not re.search(r'[a-z]', password):
            raise ValidationError("Le mot de passe doit contenit au moins une lettre minuscule")
        
        if not re.search(r'[0-9]', password):
            raise ValidationError("Le mot passe doit contenir au mopins un chiffre")
        
        if not re.search(r'[!@#$%&*()/<>{}]', password):
            raise ValidationError("Le mot passe doit contenir au moins un caractère spécial")
        

    def get_help_text(self):
        return(
            "Votre mot de passe doit contenir au moins 12 caractères, "
            "inclure une lettre majuscule, une lettre minuscule, un chiffre, "
            "et un caractère spécial (!@#$%&*()/<>{})."
        )
        