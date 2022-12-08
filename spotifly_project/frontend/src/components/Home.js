// @ts-nocheck
import { Slide, Container, Typography, Button, Fade, Avatar, CircularProgress, TextField, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemButton, ListItemText, Modal, Grid } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import LeftDrawer from "./LeftDrawer";
import {postPlaylist, getTrackListFeatures, getUserLibrary, getUserToken, getSpecificPlayList } from "../services/apiServices";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import MusicGrid from "./Grid";
import { GridNoRowsOverlay } from "@mui/x-data-grid";
const Home = () => {
  const homeText = "this is the home-page, and requires the user to be logged in";
  const initialColumns = [
    {
      field: 'cover', headerName: 'Album', width: 90, renderCell:(params) =><Avatar src={params.row.album} />,
    },
    {field: 'title', headerName: 'Title', width: 120},
    { field: 'duration', headerName: 'Duration', width: 90 },
  
  { field: 'artist', headerName: 'Artist', width: 100 },
    { field: 'danceability', headerName: 'Danceability', width: 90 },
    { field: 'energy', headerName: 'Energy', width: 100 },
  { field: 'instrumentalness', headerName: 'Instrumentalness', width: 100 },
    { field: 'energy', headerName: 'Energy', width: 100 },
    { field: 'liveness', headerName: 'Liveness', width: 100 },
    { field: 'loudness', headerName: 'Loudness', width: 100 },
    { field: 'speechiness', headerName: 'Speechiness', width: 100 },
    { field: 'tempo', headerName: 'Tempo', width: 100 },
    { field: 'valence', headerName: 'Valence', width: 100 },
  
  ]

  const [songFilters, setSongFilters] = useState({defaultFilter: (song)=>song.title !== ''})
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [filter, setFilter] = useState('')
  const [playList, setPlaylist] = useState('')
  const [userLibrary, setUserLibrary] = useState([])
  const [itemCount, setItemCount] = useState(50)
  const [loading, setLoading] = useState(false)
  const [allSongs, setAllSongs] = useState([])
  const navigate = useNavigate();
  const [selection, setSelection] = useState([]);
  const [modal, setModal] = useState(false);
  const location = useLocation()
  const [modalFormValues, setModalFormValues] = useState({name: '', description: ''})
  const [type, setType] = useState('')

  const savePlaylist = () => {
    postPlaylist({songids: selection, playlistname: modalFormValues.name, playlistdescription: modalFormValues.description}).then(data => {
      navigate('/select-playlist')
    })
  }

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setModalFormValues({
    ...modalFormValues,
    [name]: value,
  });
};

  useEffect(async () => {
    const userToken = await getUserToken();
    //console.log(userToken);
    if ('error' in userToken.data) navigate("/");
    
    //console.log(playListID);
    if (!location.state) navigate('/');
    else {
      const playListID = location.state.id;
      if (playListID === -1) {
        getUserLibrary().then(library => {
          if (library === undefined) navigate("/");
          else {
            setAllSongs(allSongs.concat(library))
            setType('default')
            //console.log(library)
          }
        });
      }
      else {
        getSpecificPlayList(playListID)
          .then(library => {
            if (library === undefined) navigate("/");
            else {
              console.log('library-length', library.length)
              setType('playlist')
              setAllSongs(allSongs.concat(library))
            }
          })
      }
    }
  }
  , [])


  const handleClick = async () => {
    if (type === 'default') {
      addSongs()
    }
    else if (type === 'playlist') {
      const newSongs = await getSpecificPlayList(location.state.id, allSongs.length)
      setAllSongs(allSongs.concat(newSongs))
    }
    
  }

  useEffect(async () => {
    console.log(allSongs)
    addSongs()
  }, [allSongs])

  const addSongs = () => {
        //console.log(allSongs[0])
      setLoading(true)
        getTrackListFeatures(allSongs.slice(itemCount-50, itemCount).map(song => song.track.id))
        .then(songFeatures => {
        //console.log(userLibrary)
          console.log(songFeatures)
          let songList = [];
          for (let i = itemCount - 50, ii = 0; ii < songFeatures.length; ii++, i++) {
          let songObj = {
            id: allSongs[i].track.id,
            album: allSongs[i].track.album.images[2].url,
            title: allSongs[i].track.name,
            artist: allSongs[i].track.artists[0].name,
            duration: millisToMinutesAndSeconds(songFeatures[ii].duration_ms),
            danceability: songFeatures[ii].danceability*100,
            energy: songFeatures[ii].energy*100,
            instrumentalness: songFeatures[ii].instrumentalness*100,
            liveness: songFeatures[ii].liveness*100,
            loudness: Math.abs(songFeatures[ii].loudness),
            
            speechiness: songFeatures[ii].speechiness*100,
            tempo: songFeatures[ii].tempo,
            valence: songFeatures[ii].valence*100
          };
          //console.log(songObj.album)
          
          songList.push(songObj);
          }
          setRows(rows.concat(songList))
          setItemCount(itemCount + 50);
          setLoading(false)
          //console.log(rows[0])
        }).then(()=>console.log(rows[0]))
    }
  

  const showMore = () => {
    setItemCount(item + 50);
    setLoading(true)
    
  }

  return (
    <div className="home-container">
      <div className="header">
      <Typography variant="h2">
        Spotifly
        </Typography>
      </div>
      
      
        <div>
        <LeftDrawer filter={filter} setSongFilters={setSongFilters} songFilters={songFilters }setFilter={setFilter} />
          </div>
    
      <Box sx={{position: "absolute", bottom: 0, right: 0, height: "90%", width: "100%"}}>
        <Container sx={{ paddingLeft: "auto", paddingRight: "auto", width: "110%" }}>
    
          {rows.length > 0 ? <div><MusicGrid selection={selection} setSelection={setSelection} columns={initialColumns} rows={rows.filter(row => {
            //console.log(row)
            return Object.keys(songFilters).every(filterkey => songFilters[filterkey](row))
          })} /><div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1rem'}}>
              <LoadingButton onClick={() => { handleClick()}} loadingIndicator="Loading..." variant="outlined" loading={loading}>Load More</LoadingButton>
              <Button variant='contained' onClick={() => setModal(true)}disabled={selection.length == 0}>Export To Playlist</Button></div></div>
            : <CircularProgress size={90} sx={{position: "absolute", right: "50%", bottom: "50%", transform: 'translate(-50%, -50%)'}} />}
          
          <Modal
            sx={{ width: "25%", height: 'fit-content', top: "50%", left: "50%", transform: 'translate(-50%, -50%)'}}
            open={modal}
            onClose={() => setModal(false)}
            BackdropProps={{style: {backgroundColor: 'rgba(0,0,0,0.9)', borderRadius: '5%', border: '2px solid white'}}}
          >
            <Grid sx={{width: '100%'}}>
              <Typography mb={5} mt={3} align="center" variant='h4'>
                Create Playlist
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: '80%', marginRight: 'auto', marginLeft: 'auto', justifyContent: 'center' }} noValidate autoComplete="off" component="form">
      
                <TextField required size='normal' id="playlist-name" label="Playlist Name" variant="outlined" name="name" value={modalFormValues.name} onChange={handleInputChange}/>
                <TextField size='normal' id="playlist-description" name="description" label="Playlist Description" value={modalFormValues.description} onChange={handleInputChange}/>
                <Grid mt={4} mb={1} container direction="row" justifyContent='space-evenly' >
                  <Grid sx={{width: '45%'}} item><Button sx={{width: '100%', fontSize: 16}}size="large" variant='outlined' onClick={()=>setModal(false)}>Return</Button></Grid>
                  <Grid sx={{width: '45%'}} item><Button variant='outlined' sx={{width: '100%', fontSize: 16}} size="large"disabled={modalFormValues.name.length < 1} onClick={()=>savePlaylist()}>Save</Button></Grid>
                  </Grid>
              </Box>
              </Grid>
          </Modal>
        </Container>
      </Box>

    </div>
  )
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default Home;
