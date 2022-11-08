from django.urls import path
from . import views

urlpatterns = [
    path('directions/',views.give_directions),
    path('search/',views.search),
    path('get_data/',views.send_data),
    # path('get_data/',views.get_data), #LATEST ADDITION
]