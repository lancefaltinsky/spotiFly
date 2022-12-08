import styled from 'styled-components';
import { Link as LinkS } from 'react-scroll';

export const HeroContainer = styled.div`
        background: #ffebe0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 30px;
        height: 1000px;
        position: relative;
        z-index: 1;
        
`

export const HeroContent = styled.div`
        z-index: 3;
        max-width: 1200px;
        position: abosolute;
        padding: 8px 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
`
export const HeroH1 = styled.h1`
        color: #f5612e;
        font-size: 128px;
        text-align: center;
        margin-bottom: 0px;

        @media screen and (max-width: 768px) {
            font-size: 64px;

        }
        @media screen and (max-width: 480px) {
            font-size: 32px;
        }
`
export const HeroP = styled.p`
        margin-top: 12px;
        color: #f5612e;
        font-size: 32px;
        text-align: center;
        max-width: 600px;
        
        @media screen and (max-width: 768px) {
            font-size: 24px;

        }
        @media screen and (max-width: 480px) {
            font-size: 18px;
        }
`
export const HeroBtnWrapper = styled.div`
        position: relative;
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;

`
