from urllib.parse import urlparse
from django.urls import path, include
from .views import main, callback

urlpatterns = [
    path('', main),
    path('/callback', callback)
]
