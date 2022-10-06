import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import img1 from '../../images/avatars/image-amyrobson.png'

const Container = styled.div`
display: flex;
flex-direction: column;
margin: 1rem;
background-color: var(--white);
padding: 0.5rem 1rem;
border-radius: 5px;
`
const TextArea = styled.textarea`
margin: 10px 0;
border-color: var(--light-gray);
border-radius: 5px;
padding: 8px 15px;
`

const Footer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color: var(--moderate-blue);
font-weight: 700;

`
const Avatar = styled.img`
width: 32px;
`
const Send = styled.div`
background-color: var(--moderate-blue);
color: var(--white);
font-weight: 700;
padding: 10px 25px;
border-radius: 5px;
`

const AddCommentCard = () => {

    return (
        <Container>
            <TextArea rows="5" cols="33" placeholder='Add a comment...'>
                
            </TextArea>
            <Footer>
                <Avatar src={img1} />
                <Send>
                    SEND
                </Send>
            </Footer>
        </Container>
    )
}

export default AddCommentCard;