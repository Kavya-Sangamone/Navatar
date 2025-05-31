from django.urls import path
from . import views

urlpatterns = [
    path('super-admin/', views.super_admin_dashboard, name='super_admin_dashboard'),
   
]
