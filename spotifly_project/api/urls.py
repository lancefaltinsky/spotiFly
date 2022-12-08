from django.urls import path
from .views import *

urlpatterns = [ 
    
    path('/token', UserTokenView.as_view(), name='token'),
    path('/track-features', TrackFeaturesView.as_view(), name='track-features'),
    path('/user-library', UserLibraryView.as_view(), name='user-library'),
    path('/playlist-library', PlaylistLibraryView.as_view(), name="playlist-library"),
    path('/contact-form',ContactFormView.as_view(), name='contact-form'),
    path('/user-playlists', UserPlaylistsView.as_view(), name='user-playlists'),
    path('/create-playlist', CreatePlaylistForUser.as_view(), name='create-playlist'),
    path('/add-to-playlist', AddToPlaylist.as_view(), name='add-to-playlist')
]