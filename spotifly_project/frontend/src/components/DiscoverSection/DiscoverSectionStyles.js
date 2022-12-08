import styled from 'styled-components';

export const DiscoverContainer = styled.div`
    background-color: #D3FFC7;
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

export const TitleWrapper = styled.div`
    margin: 16px;

    
`
export const Title = styled.h1`
    color: #646a80;
    text-align: center;
    font-size: 48px;
    font-weight: 600;
    line-weight: 1.1;
`
export const Description = styled.h4`
    color: #646a80;
    text-align: center;
    font-size: 32px;
    line-weight: 24px;
    
`
export const InfoCardWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 20px;
    grid-auto-rows: 1fr;
    justify-content: center;
`