import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import juliusomo from '../../images/avatars/image-juliusomo.png'

const Container = styled.div`
display: flex;
flex-direction: column;
margin: 1rem;
background-color: var(--white);
padding: 0.5rem 1rem;
border-radius: 5px;
`
const Line = styled.div`
display: flex;
align-items: flex-start;

width: auto;
>:first-child{
    display: none;
}
>:last-child{
    display: none;
}

@media (min-width: 1440px){
    >:first-child{
        display: flex;
    }
    >:last-child{
        display: flex;
    }
    >:nth-child(2){
        margin: 0 10px;
        width: 100%;
    }
}

`

const TextArea = styled.textarea`
width: -webkit-fill-available;
margin: 10px 0;
border-color: var(--grayish-blue);
border-radius: 5px;
padding: 8px 15px;
opacity: 0.8;
cursor: pointer;

:hover{
    opacity: 1;
}

@media (min-width: 1440px){
    width: auto;
}
`

const Footer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color: var(--moderate-blue);
font-weight: 700;

@media (min-width: 1440px){
    display: none;
}

`
const Avatar = styled.img`
width: 32px;
height: 32px;
`
const Send = styled.div`
background-color: var(--moderate-blue);
color: var(--white);
font-weight: 700;
padding: 10px 25px;
border-radius: 5px;
cursor: pointer;
height: 20px;

:hover{
    opacity: 0.5;
}
`

const AddCommentCard = ({ onFocusSend, onSend }) => {
    const [content, setContent] = useState('')

    return (
        <Container>
            <Line>
                <Avatar src={juliusomo} />
                <TextArea rows="5" cols="33" placeholder='Add a comment...'
                    onChange={e => setContent(e.target.value)}
                    value={content}
                    onFocus={onFocusSend}
                >
                </TextArea>
                <Send onFocus={() => {
                    onFocusSend();
                }}
                    onClick={() => {
                        onSend(content)
                        setContent('')
                    }}>
                    SEND
                </Send>
            </Line>
            <Footer>
                <Avatar src={juliusomo} />
                <Send
                    onFocus={() => {
                        onFocusSend();
                    }}
                    onClick={() => {
                        onSend(content)
                        setContent('')
                    }}>
                    SEND
                </Send>
            </Footer>
        </Container>
    )
}

export default AddCommentCard;