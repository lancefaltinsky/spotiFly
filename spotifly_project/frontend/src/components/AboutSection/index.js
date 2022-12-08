import React from 'react'
import { AboutContainer, AboutH1, AboutWrapper, AboutCard, AboutMemberImage, AboutMemberName, AboutMemberDescription } from './AboutSectionStyles';
const AboutSection = () => {
    return (
        <AboutContainer id='about'>
            <AboutH1>Our Team</AboutH1>
            <AboutWrapper>
                <AboutCard>
                    <AboutMemberImage src={"../../../static/images/gvincentprofilepic.jpg"} />
                    <AboutMemberName>Geordy Vincent</AboutMemberName>
                    <AboutMemberDescription></AboutMemberDescription>
                </AboutCard>
                <AboutCard>
                    <AboutMemberImage src={"../../../static/images/jkarlsenprofilepic.png"} />
                    <AboutMemberName>Jonathan Karlsen</AboutMemberName>
                    <AboutMemberDescription></AboutMemberDescription>
                </AboutCard>
                <AboutCard>
                    <AboutMemberImage src={"../../../static/images/lfaltinskyprofilepic.png"} />
                    <AboutMemberName>Lance Faltinsky</AboutMemberName>
                    <AboutMemberDescription></AboutMemberDescription>
                </AboutCard>
            </AboutWrapper>
        </AboutContainer>
    )
}

export default AboutSection;