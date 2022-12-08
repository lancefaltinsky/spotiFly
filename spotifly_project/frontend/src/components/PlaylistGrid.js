import { Box, Button, CircularProgress, Container, CssBaseline, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPlaylists } from "../services/apiServices";

const PlaylistGrid = () => {

  const [loading, setLoading] = useState(true);
  const [playLists, setPlayLists] = useState([{name: 'Default Library', id: -1}])
  const navigate = useNavigate();
  useEffect(() => {
    getUserPlaylists()
      .then(data => {
        if (data === undefined) navigate('/')
        else setPlayLists(playLists.concat(data))
      })
  },[])
  return (
    <div style={{ height: '100vh', width: '100vw' }} className="home-container">
      <CssBaseline />
      <div style={{ position: 'fixed', top: 0, zIndex: 10 }} className="header">
        
      <Typography variant="h2">
        Spotifly
        </Typography>
      </div>
  
        {!playLists && <Grid item xs={3}><CircularProgress size={"5rem"} /> </Grid>}
        {playLists && <Grid
      container
      direction='row'
      
        mt={10}
      style={{position: 'absolute', paddingTop: '2rem', left: "15%", height: 'fit-content', width: '70%', rowGap: "1rem" }}
      >{playLists.map(playlist => (
        <Grid key={playlist.id} sx={{ textAlign: 'center' }} item xs={6} >
          <Button sx={{ fontSize: "1.5rem", width: "80%" }} variant="contained" onClick={() => { navigate('/sorter', {state: {id: playlist.id}});}}>{playlist.name} </Button>
        </Grid>))}
      </Grid>}
      </div>
  );
}

export default PlaylistGrid;