from django import forms
from .models import User, Company

class AddUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['user_name', 'email', 'mobileno', 'company', 'role']
        widgets = {
            'role': forms.Select(choices=User.role),
        }
