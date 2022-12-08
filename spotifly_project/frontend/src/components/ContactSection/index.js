import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ContactContainer, ContactH1, ContactWrapper, ContactForm, ContactLabel, ContactInput, ContactTextArea, ContactButton } from './ContactSectionStyles';


//axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.withCredentials = true

// CSRF is fixed when you use 
const ContactSection = () => {


    const [contactForm, setContactForm] = useState([]);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newSubject, setNewSubect] = useState('');
    const [newMessage, setNewMessage] = useState('');






    const addContactInformation = async (event) => {
        event.preventDefault();

        const ContactObject = {
            name: newName,
            email: newEmail,
            subject: newSubject,
            message: newMessage,
        }

        console.log("Contact Object: ", ContactObject);

        setContactForm(contactForm.concat(ContactObject));

        const contactData = JSON.stringify(ContactObject);

        console.log(contactData);

        await axios.post('http://127.0.0.1:8000/api/contact-form', contactData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log("response data", response.data)
        }).catch(error => {
            if (error.response) {
                console.log("error response data", error.response.data);
                console.log("error response status", error.response.status);
                console.log("error response headers", error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

        setNewName('');
        setNewEmail('');
        setNewSubect('');
        setNewMessage('');

    }

    const addNameChange = (event) => {

        setNewName(event.target.value);
    }

    const addEmailChange = (event) => {

        setNewEmail(event.target.value);
    }

    const addSubjectChange = (event) => {

        setNewSubect(event.target.value);
    }

    const addMessageChange = (event) => {

        setNewMessage(event.target.value);
    }



    return (
        <ContactContainer id='contact'>
            <ContactWrapper>
                <ContactH1>Contact Us</ContactH1>
                <ContactForm onSubmit={addContactInformation} form="contact-form">
                    <input value={newName} onChange={addNameChange} placeholder="Full Name" />
                    <input value={newEmail} onChange={addEmailChange} placeholder="Email" />
                    <input value={newSubject} onChange={addSubjectChange} placeholder="Subject" />
                    <textarea value={newMessage} onChange={addMessageChange} placeholder="Message" />
                    <button type="submit" className="submitButton" >Submit</button>
                </ContactForm>
            </ContactWrapper>


        </ContactContainer>
    )
}

export default ContactSection;