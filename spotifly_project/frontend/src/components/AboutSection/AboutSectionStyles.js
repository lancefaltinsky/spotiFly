import styled from 'styled-components';

export const AboutContainer = styled.div`
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    
`

export const AboutH1 = styled.h1`
    color: #f5612e;
    font-size: 64px;
    text-align: center;
    margin-bottom: 64px;

`

export const AboutWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px;
    grid-auto-rows: minmax(150px, auto);
`
export const AboutCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 340px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: all 0.2s ease-in-out;

    &.hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

`

export const AboutMemberImage = styled.img`
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
`

export const AboutMemberName = styled.h2`
        font-size: 1 rem;
        margin-bottom: 10px;

`

export const AboutMemberDescription = styled.p`
        font-size: 1rem;
        text-align: center;
`