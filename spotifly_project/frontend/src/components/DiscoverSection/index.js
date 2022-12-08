import React from 'react'
import InfoCard from '../InfoCard'
import { DiscoverContainer, TitleWrapper, Title, Description, InfoCardWrapper } from './DiscoverSectionStyles'
import { moodInfo, propertiesInfo, contextInfo, segmentsInfo } from '../InfoCard/Data'


const DiscoverSection = () => {
    return (
        <>
            <DiscoverContainer id='discover'>
                <TitleWrapper>
                    <Title>What is it?</Title>
                    <Description>
                        Spotify has built-in audio features for each of their tracks, such as how happy a song is on a 0-1 scale.
                        We allow you to filter your Spotify playlist by these features.
                    </Description>
                </TitleWrapper>
                <InfoCardWrapper>
                    <InfoCard {...moodInfo} />
                    <InfoCard {...propertiesInfo} />
                    <InfoCard {...contextInfo} />
                </InfoCardWrapper>
            </DiscoverContainer>
        </>
    )
}

export default DiscoverSection