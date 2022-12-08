from django.db import models

# Create your models here.

#class Track(models.Model):
#    # track model containing basic track details but also the audio features
#    id = models.CharField(max_length = 100)
#    name = models.CharField(max_length = 255)
#    primary_artist = models.CharField(max_length = 50)
#    acousticness = models.FloatField(max_length = 10)
#    danceability = models.FloatField(max_length = 10)
#    energy = models.FloatField(max_length = 10)
#    instrumentalness = models.FloatField(max_length = 10)
#    liveness = models.FloatField(max_length = 10)
#    loudness = models.FloatField(max_length = 10)
#    speechiness = models.FloatField(max_length = 10)
#    valence = models.FloatField(max_length = 10)
#    tempo = models.FloatField(max_length = 10)
#    key = models.IntegerField(max_length = 10)
#    time_signature = models.IntegerField(max_length = 10)
#
#class User(models.model):
#    # user model containing basic user details
#    id = models.CharField(max_length = 100)
#    name = models.CharField(max_length = 255)

class ContactForm(models.Model):
    name = models.CharField(max_length = 100)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()