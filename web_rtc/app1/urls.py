from django.urls import path
from app1.views import room

urlpatterns = [
    path('room/<str:room_name>/', room),
]
