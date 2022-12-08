import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, Slider } from '@mui/material';





export default function LeftDrawer({ songFilters, setSongFilters, filter, setFilter }) {
  const [filterValues, setFilterValues] = useState({ danceability: [0, 100], energy: [0, 100], instrumentalness: [0,100], liveness: [0,100], loudness: [0,100], speechiness: [0,100], tempo: [0,200], valence: [0,100] });
  const [open, setOpen] = useState({ "danceability": false, "duration": false, "energy": false, "instrumentalness": false, "liveness": false, "loudness": false, "speechiness": false, "tempo": false, "valence": false})
  const drawerWidth = "12.5%"
  const options = {
    "Artist": ["One-One", "One-Two", "One-Three"],
    "Duration": ["Two-One", "Two-Two"],
    "Danceability": ["Three-One"],
    "Energy": ["Energy-Open"]
  }


  return (
    <Box sx={{ display: 'flex', backgroundColor: "red" }}>
      <CssBaseline />
      
      <Drawer sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          top: "6rem",
          boxSizing: 'border-box',
          backgroundColor: "transparent",
        },
        
      }} variant="permanent" anchor='left' >
        <Typography align='center' variant="h4">Filters</Typography>
        <List>
        
              <List>
              <ListItemButton dense divider={true} onClick={() => setOpen({...open, danceability: !open.danceability})} key="danceability">
                <ListItemText primaryTypographyProps={{sx: {fontSize: 20}}}  primary="Danceability" />
                {open.danceability ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open.danceability} timeout="auto" unmountOnExit>
                <List component="div">
                    
                <ListItem>
                <Slider
                  getAriaLabel={() => "Danceability range"}
                    value={filterValues.danceability}
                    onChange={(e, newValue) => {
                      setSongFilters({ ...songFilters, dancability: (song) => song.danceability > filterValues.danceability[0] && song.danceability < filterValues.danceability[1]});
                      setFilterValues({ ...filterValues, danceability: newValue })
                      console.log(filterValues.danceability);
                    }}
                    sx={{width: "100%"}}
                  />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
            </List>
          <List>
              <ListItemButton dense divider={true} onClick={() => setOpen({...open, energy: !open.energy})} key="energy">
                <ListItemText primaryTypographyProps={{sx: {fontSize: 20}}}  primary="Energy" />
                {open.energy ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open.energy} timeout="auto" unmountOnExit>
                <List component="div">
                    
                <ListItem>
                <Slider
                  getAriaLabel={() => "Energy range"}
                    value={filterValues.energy}
                    onChange={(e, newValue) => {
                      setSongFilters({ ...songFilters, energy: (song) => song.energy > filterValues.energy[0] && song.energy < filterValues.energy[1]});
                      setFilterValues({ ...filterValues, energy: newValue })
                      //console.log(filterValues.danceability);
                    }}
                    sx={{width: "100%"}}
                  />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
            </List>

          
          <List>
              <ListItemButton dense divider={true} onClick={() => setOpen({...open, instrumentalness: !open.instrumentalness})} key="instrumentalness">
                <ListItemText primaryTypographyProps={{sx: {fontSize: 20}}}  primary="Instrumentalness" />
                {open.energy ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open.instrumentalness} timeout="auto" unmountOnExit>
                <List component="div">
                    
                <ListItem>
                <Slider
                  getAriaLabel={() => "Instrumentalness range"}
                    value={filterValues.instrumentalness}
                    onChange={(e, newValue) => {
                      setSongFilters({ ...songFilters, instrumentalness: (song) => song.instrumentalness > filterValues.instrumentalness[0] && song.instrumentalness < filterValues.instrumentalness[1]});
                      setFilterValues({ ...filterValues, instrumentalness: newValue })
                      console.log(filterValues.instrumentalness);
                    }}
                    sx={{width: "100%"}}
                  />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
          </List>
          
          <List>
              <ListItemButton dense divider={true} onClick={() => setOpen({...open, liveness: !open.liveness})} key="liveness">
                <ListItemText primaryTypographyProps={{sx: {fontSize: 20}}}  primary="Liveness" />
                {open.energy ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open.liveness} timeout="auto" unmountOnExit>
                <List component="div">
                    
                <ListItem>
                <Slider
                  getAriaLabel={() => "Liveness range"}
                    value={filterValues.liveness}
                    onChange={(e, newValue) => {
                      setSongFilters({ ...songFilters, liveness: (song) => song.liveness > filterValues.liveness[0] && song.liveness < filterValues.liveness[1]});
                      setFilterValues({ ...filterValues, liveness: newValue })
                      console.log(filterValues.liveness);
                    }}
                    sx={{width: "100%"}}
                  />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
            </List>

          <List>
              <ListItemButton dense divider={true} onClick={() => setOpen({...open, loudness: !open.loudness})} key="loudness">
                <ListItemText primaryTypographyProps={{sx: {fontSize: 20}}}  primary="Loudness" />
                {open.loudness ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open.loudness} timeout="auto" unmountOnExit>
                <List component="div">
                    
                <ListItem>
                <Slider
                  getAriaLabel={() => "Loudness range"}
                    value={filterValues.loudness}
                    onChange={(e, newValue) => {
                      setSongFilters({ ...songFilters, loudness: (song) => (song.loudness > (filterValues.loudness[0])) && (song.loudness < (filterValues.loudness[1])) });
                      setFilterValues({ ...filterValues, loudness: newValue })
                      console.log(filterValues.loudness);
                    }}
                    sx={{width: "100%"}}
                  />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
          </List>
          
          <List>
              <ListItemButton dense divider={true} onClick={() => setOpen({...open, tempo: !open.tempo})} key="tempo">
                <ListItemText primaryTypographyProps={{sx: {fontSize: 20}}}  primary="Tempo" />
                {open.tempo ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open.tempo} timeout="auto" unmountOnExit>
                <List component="div">
                    
                <ListItem>
                <Slider
                  getAriaLabel={() => "Tempo range"}
                    value={filterValues.tempo}
                    onChange={(e, newValue) => {
                      setSongFilters({ ...songFilters, tempo: (song) => song.tempo > filterValues.tempo[0]*2 && song.tempo < filterValues.tempo[1]*2});
                      setFilterValues({ ...filterValues, tempo: newValue })
                      console.log(filterValues.tempo);
                    }}
                    sx={{width: "100%"}}
                  />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
          </List>
          <List>
              <ListItemButton dense divider={true} onClick={() => setOpen({...open, speechiness: !open.speechiness})} key="speechiness">
                <ListItemText primaryTypographyProps={{sx: {fontSize: 20}}}  primary="Speechiness" />
                {open.speechiness ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open.speechiness} timeout="auto" unmountOnExit>
                <List component="div">
                    
                <ListItem>
                <Slider
                  getAriaLabel={() => "Speechiness range"}
                    value={filterValues.speechiness}
                    onChange={(e, newValue) => {
                      setSongFilters({ ...songFilters, speechiness: (song) => song.speechiness > filterValues.speechiness[0] && song.speechiness < filterValues.speechiness[1] });
                      setFilterValues({ ...filterValues, speechiness: newValue })
                      console.log(filterValues.speechiness);
                    }}
                    sx={{width: "100%"}}
                  />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
          </List>
          <List>
              <ListItemButton dense divider={true} onClick={() => setOpen({...open, valence: !open.valence})} key="valence">
                <ListItemText primaryTypographyProps={{sx: {fontSize: 20}}}  primary="Valence" />
                {open.valence ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open.valence} timeout="auto" unmountOnExit>
                <List component="div">
                    
                <ListItem>
                <Slider
                  getAriaLabel={() => "Valence range"}
                    value={filterValues.valence}
                    onChange={(e, newValue) => {
                      setSongFilters({ ...songFilters, valence: (song) => song.valence > filterValues.valence[0]&& song.valence < filterValues.valence[1]});
                      setFilterValues({ ...filterValues, valence: newValue })
                      console.log(filterValues.valence);
                    }}
                    sx={{width: "100%"}}
                  />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
            </List>
      </List>
      </Drawer>
    </Box>
  )
}