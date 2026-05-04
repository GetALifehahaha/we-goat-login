from django.core.exceptions import ValidationError

class HasSpecialCharacterValidator:
    def validate(self, password, user=None):
        if not any(char in "`~!@#$%^&*()_+}{}<>/?,." for char in password):
            raise ValidationError("Password must contain a special character.")
        
    def get_help_text(self):
        return "Your password must contain at least one special character."
    

class CaseRequirementValidator:
    def validate(self, password, user=None):
        if password.lower() == password or password.upper() == password:
            raise ValidationError("Password must contain at least 1 uppercase and 1 lowercase.")
        
    def get_help_text(self):
        return "Must include both uppercase and lowercase letters."