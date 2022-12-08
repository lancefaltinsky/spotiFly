from django.urls import path
from .views import index


app_name = "frontend"
urlpatterns = [
    path('sorter', index, name="sorter"),
    path('select-playlist', index, name="select-playlist"),
    path('about-us', index),
    path('logintemp', index),
    path('', index, name='login')
]