import styled from 'styled-components';
import { Link as LinkS } from 'react-scroll'

export const InfoCardContainer = styled.div`
    background: linear-gradient(#ffece4,#fff);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 340px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    width: 240px;
    
    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
    
`

export const PictureWrapper = styled.div`
    max-width: 200px;
    max-height:200px;
    
`
export const Picture = styled.img`
    width: 150px;
    height: 150px;
    
`
export const InfoTitleWrapper = styled.div`
    
    
`

export const InfoTitle = styled.h3`
    font-size: 20px;
    color: #646a80;
    text-decoration: underline;
    padding:20px;

`

export const InfoDescWrapper = styled.div`
    flex-wrap: wrap;
    text-align: center;
`

export const InfoDesc = styled.p`
    font-size: 1rem;
    font-weight: bold;
    color: #646a80;
`

