from django.db import models


class Company(models.Model):
    company_id=models.CharField(primary_key=True)
    company_name = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    country_code = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.company_name,self.company_id
    
class User(models.Model):
    user_id = models.CharField(max_length=20, primary_key=True)  # VARCHAR as PK
    user_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mobileno = models.CharField(max_length=15)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, choices=[
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('admin', 'Admin'),
        ('superadmin', 'Super Admin'),
    ])

    def __str__(self):
        return f"({self.user_id} - {self.user_name})"


