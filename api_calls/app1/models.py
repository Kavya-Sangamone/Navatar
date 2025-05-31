from django.db import models

# Create your models here.
class company(models.Model):
    company_id=models.CharField(primary_key=True)