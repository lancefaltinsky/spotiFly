import styled from 'styled-components';

export const ContactContainer = styled.div`
    
    background-color: #5c16c5;
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    z-index: 1;
    margin: 0;
`
export const ContactWrapper = styled.div`
        max-width: 600px;
       
`
export const ContactH1 = styled.h1`
    color: #c59016;
    font-size: 64px;
    text-align: center;
    margin: 10px;
    

`

export const ContactForm = styled.form`
    
    input, textarea {
        
        box-sizing: border-box;
        width: 100%;
        font-size: 1rem;
        padding: 1rem;
        background-color: #fff
        outline: none;
        border: none;
        border-radius: 6px;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
textarea {
    min-height: 250px;
    resize: vertical;
}

.submitButton {
    width: 100%;
    font-size: 1.2rem;
    display: inline-block;
    outline: none;
    border: none;
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
`