import React from 'react'
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import { HeroContainer, HeroBackground, HeroContent, HeroH1, HeroP, HeroBtnWrapper, HeroSignInBttn } from './HeroSectionStyles';


const HeroSection = () => {

    const auth = {
        url: 'auth'
    }

    return (
        <HeroContainer id='top'>
            <HeroContent>
                <HeroH1>Sort your playlists by feelings.</HeroH1>
                <HeroP>Sign in to your Spotify account to get started.</HeroP>

                <HeroBtnWrapper>
                    <Button
                        className='account-button'
                        size="large" href={auth.url}
                        variant="contained"
                        style={{ backgroundColor: '#f5612e' }}
                        endIcon={<LoginIcon />}
                    >
                        Spotify Login
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection;