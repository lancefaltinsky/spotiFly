import React from 'react'
import { InfoCardContainer, PictureWrapper, Picture, InfoTitleWrapper, InfoTitle, InfoDescWrapper, InfoDesc } from './InfoCardStyles'


const InfoCard = ({ id, img, alt, title, desc, infoLocation, btName }) => {
    return (
        <InfoCardContainer id={id}>
            <PictureWrapper>
                <Picture src={img} alt={alt}></Picture>
            </PictureWrapper>
            <InfoTitleWrapper>
                <InfoTitle>{title}</InfoTitle>
            </InfoTitleWrapper>
            <InfoDescWrapper>
                <InfoDesc>{desc}</InfoDesc>
            </InfoDescWrapper>
        </InfoCardContainer>
    )
}

export default InfoCard