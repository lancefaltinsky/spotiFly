from .models import ContactForm
from rest_framework import serializers

class ContactFormSeralizer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = ['name', 'email','subject','message',]

