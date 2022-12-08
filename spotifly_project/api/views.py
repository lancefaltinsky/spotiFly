from asyncio.windows_events import NULL
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import ContactFormSeralizer
from .models import ContactForm
import requests
import json


# Create your views here.


######### READ:
# For ALL of these endpoints, they initially will try to get the token from the session vars. If that cannot be found it will check for the token in the query strings.
# If for some reason the token is not automatically getting found, provide it in query strings! ie tack on a ?token=TOKEN_HERE to the end of the endpoint,
# for instance, /api/user-library?token=TOKEN_HERE
# obviously /api/token is the only exception here.

class UserTokenView(APIView):
    # literally just returns the current session token. may be problematic if the API is somehow being called not on behalf of the client.
    # will see if i can determine a time when this will happen and do any remediation that may be necessary for this
    # alternatively you can specify a token in the query string, such as /api/u
    def get(self, request):
        token = request.session.get('spotify_token') or 'No Token Set'
        return Response({'token': token})

class TrackFeaturesView(APIView):
    # returns acousticness, danceability, key, etc. all the stuff we want.
    # directly returns spotify json, does not alter the format. see https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
    # USAGE: /api/track-features?ids=trackid,trackid,trackid,etc
    def get(self, request):
        token = request.session.get('spotify_token') or request.GET.get('token', None)
        if not token:
            return Response({'error': 'No token provided'})
        ids = request.GET.get('ids', None)
        print(ids)
        if not ids:
            return Response({'error': 'No ids provided in query'})
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = requests.get(f'https://api.spotify.com/v1/audio-features?ids={ids}', headers=headers)
        return Response(response.json())

class UserLibraryView(APIView):
    # returns the ENTIRETY of the user's library. very heavy, so use sparingly... please?
    # USAGE: /api/user-library
    def get(self, request):
        token = request.session.get('spotify_token') or request.GET.get('token', None)
        if not token:
            return Response({'error': 'No token provided'})
        headers = {
            'Authorization': f'Bearer {token}'
        }
        all_items = []
        url = 'https://api.spotify.com/v1/me/tracks?limit=50'
        while True:
            response = requests.get(url, headers=headers)
            this_json = response.json()
            if 'error' in this_json.keys():
                return Response(json.dumps({'error': 'invalid token'}))
            for i in this_json['items']:
                all_items.append(i)
                print(i)
            if this_json['next'] != None:
                url = this_json['next']
            else:
                break
        return Response(json.dumps({'items':all_items}))

class UserPlaylistsView(APIView):
    # returns all user's playlists
    # USAGE: /api/user-playlists
    def get(self, request):
        token = request.session.get('spotify_token') or request.GET.get('token', None)
        if not token:
            return Response({'error': 'No token provided'})
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = requests.get(f'https://api.spotify.com/v1/me/playlists', headers=headers)
        print(response)
        return Response(response.json())

class CreatePlaylistForUser(APIView):
    # creates a playlist for the user
    # USAGE: /api/create-playlist?name=NAME?public=TRUE/FALSE?descDESCRIPTION_HERE
    # RETURNS: playlist "object" (you probably just want the ID)

    def get(self, request):
        token = request.session.get('spotify_token') or request.GET.get('token', None)
        if not token:
            return Response({'error': 'No token provided'})
        headers = {
            'Authorization': f'Bearer {token}'
        }
        name = request.GET.get('name', None) or 'Auto-generated playlist'
        desc = request.GET.get('desc', None) or 'An auto-generated playlist from spotiFly'
        public = request.GET.get('public', None) or False
        data = {
            'name': name,
            'description': desc,
            'public': public
        }
        response = requests.post(f'https://api.spotify.com/v1/me/playlists', headers=headers, data=json.dumps(data))
        return Response(response.json())
    
    # USE POST TO CREATE ENTRIES
    def post(self, request):
        token = request.session.get('spotify_token') or request.GET.get('token', None)
        if not token:
            return Response({'error': 'No token provided'})
        headers = {
            'Authorization': f'Bearer {token}'
        }
        print(request.data)
        name = request.data['name']
        description = request.data['description']
        data = {
            'name': name,
            'description': description,
            'public': False
        }
        response = requests.post(f'https://api.spotify.com/v1/me/playlists', headers=headers, data=json.dumps(data))
        return Response(response.json())
    
class ContactFormView(APIView):
    seralizer_class = ContactFormSeralizer

    def get_queryset(self):
        contactform = ContactForm.objects.all()
        return contactform
    
    def post(self,request, *args, **kwargs):
        contactform_data = request.data

        new_contact = ContactForm.objects.create(name=contactform_data["name"], email=contactform_data["email"],subject=contactform_data["subject"],message=contactform_data["email"])

        new_contact.save()

        serializer = ContactFormSeralizer(new_contact)

        return Response(serializer.data)

        
class AddToPlaylist(APIView):
    # adds items to a playlist
    # USAGE: /api/add-to-playlist?playlist_id=PLAYLIST_ID?uris=TRACK_URI,TRACK_URI,TRACK_URI
    # SEPARATE URI's with commas
    def get(self, request):
        token = request.session.get('spotify_token') or request.GET.get('token', None)
        if not token:
            return Response({'error': 'No token provided'})
        headers = {
            'Authorization': f'Bearer {token}'
        }
        playlist_id = request.GET.get('playlist_id', None)
        uris = request.GET.get('uris', None)
        #data = {
        #    'uris': uris,
        #    'playlist_id': playlist_id
        #}
        print('uris', uris)
        response = requests.post(f'https://api.spotify.com/v1/me/playlists/{playlist_id}/tracks?uris={uris}?position=0', headers=headers)
        print(response)
        return Response(response.json())

    # USE POST TO CREATE ENTRIES
    def post(self, request):
        token = request.session.get('spotify_token') or request.GET.get('token', None)
        if not token:
            return Response({'error': 'No token provided'})
        headers = {
            'Authorization': f'Bearer {token}'
        }
        playlist_id = request.data['playlist_id']
        uris=request.data['uris']
        print(uris)
        response = requests.post(f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks?uris={uris}', headers=headers)
        print(response.content)
        return Response(response.json())

class PlaylistLibraryView(APIView):
    # Returns the trackids of the specified playlist.
    # USAGE: /api/playlist-library
    def get(self, request):
        token = request.session.get('spotify_token') or request.GET.get('token', None)
        if not token:
            return Response({'error': 'No token provided'})
        headers = {
            'Authorization': f'Bearer {token}'
        }
        all_items = []
        playlistid = request.GET.get('playlistid', None)
        offset = request.GET.get('offset', None)
        #print(playlistid)
        url = "https://api.spotify.com/v1/playlists/{}/tracks?offset={}".format(playlistid, offset)
        response = requests.get(url, headers=headers)
        #print(response)
        return Response(response.json())
        '''
        while True:
            response = requests.get(url, headers=headers)
            this_json = response.json()
            if 'error' in this_json.keys():
                return Response(json.dumps({'error': 'invalid token'}))
            for i in this_json['items']:
                all_items.append(i)
                print(i)
            if this_json['next'] != None:
                url = this_json['next']
            else:
                break
        return Response(json.dumps({'items':all_items}))
        '''
