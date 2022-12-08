import { compose } from '@mui/system'
import axios from 'axios'
const baseUrl = 'api/'


const getUserLibrary = async () => {
  const userLibrary = await axios.get(baseUrl + 'user-library')
  const jsonUserLibrary = JSON.parse(userLibrary.data)
  if ('error' in jsonUserLibrary) return undefined;
  //console.log(jsonUserLibrary.items)
  //console.log(userLibrary)
  return jsonUserLibrary.items;
}

const getUserToken = async () => {
  const userToken = await axios.get(baseUrl + 'token');
  console.log(userToken)
  return userToken;
}

const getTrackListFeatures = async (trackids) => {
  //const trackFeatures = await axios.get(baseUrl + 'track-features?'+trackid);
  //console.log(trackids)
  const trackFeatures = await axios.get(baseUrl + 'track-features?ids=' + trackids.join(","));
  if ('error' in trackFeatures.data ) return undefined
  console.log('trakcfeatures')
  //console.log(trackFeatures);
  return trackFeatures.data.audio_features;
}

const getUserPlaylists = async () => {
  const userPlaylists = await axios.get(baseUrl + 'user-playlists');
  console.log(userPlaylists);
  if ('error' in userPlaylists.data) return undefined;
  console.log(userPlaylists.data.items);
  return userPlaylists.data.items.filter(playlist => playlist.tracks.total > 0);
}

const getSpecificPlayList = async (playlistid, offset) => {
  const playlist = await axios.get(baseUrl + 'playlist-library?playlistid=' + playlistid+"?offset="+offset);
  if ('error' in playlist.data) return undefined
  console.log("YEET!", playlist)
  return playlist.data.tracks.items;
}

const postPlaylist = async ({ songids, playlistname, playlistdescription }) => {
  const url = baseUrl + `create-playlist`
  const playlist = await axios.post(url, { name: playlistname, description: playlistdescription })
    .then((data) => {
      axios.post(baseUrl + `add-to-playlist`, { playlist_id: data.data.id, uris: `spotify:track:${songids.join(',spotify:track:')}` })
        .then(data => data)
    });
  return playlist
  /*
  /api/add-to-playlist?playlist_id=PLAYLIST_ID?uris=TRACK_URI,TRACK_URI,TRACK_URI
    # SEPARATE URI's with commas
  */ 

}

export { postPlaylist, getUserLibrary, getUserToken, getTrackListFeatures, getUserPlaylists, getSpecificPlayList}