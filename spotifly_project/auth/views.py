from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from .credentials import CLIENT_ID, REDIRECT_URL
import api.utils

# Create your views here.
def main(request):
    spotify_login = f'https://accounts.spotify.com/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URL}&scope=playlist-modify-private%20user-library-read'
    if not request.session.get('spotify_token'):
        print(f"User does not have a token, directing to login")
        return HttpResponseRedirect(spotify_login)
    # test if user is properly logged in by trying to get their library
    disp_data = api.utils.get_user_profile(request)
    if 'error' in disp_data.keys():
        print(f"Error when getting profle: {disp_data}")
        print("Setting token to NONE and redirecting")
        request.session['spotify_token'] = None
        return HttpResponseRedirect(spotify_login)
    else:
        request.session['user_id'] = disp_data['id']
    return redirect('frontend:select-playlist')
    #HttpResponse(f"Hello! You are authed. You are logged in as {request.session.get('user_id')}.")

def callback(request):
    code = request.GET.get('code', None)
    if not code:
        print("Code not found; redirecting")
        return redirect(main)
    else:
        token = api.utils.code_to_token(code)
        if 'error' in token.keys():
            print(f"Error encountered! {token}.")
            return redirect(main)
        print("SETTING ACCESS TOKEN!")
        request.session['spotify_token'] = token['access_token']
        return redirect(main)
    print("No issue; redirect to main.")
    return redirect(main)