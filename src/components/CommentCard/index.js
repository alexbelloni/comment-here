import React from 'react';
import styled from 'styled-components';
import img1 from '../../images/avatars/image-amyrobson.png'
import iconReply from '../../images/icon-reply.svg';
import iconMinus from '../../images/icon-minus.svg';
import iconPlus from '../../images/icon-plus.svg';
import iconDelete from '../../images/icon-delete.svg';
import iconEdit from '../../images/icon-edit.svg';
/**
 *     {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "1 month ago",
      "score": 12,
      "user": {
        "image": { 
          "png": "./images/avatars/image-amyrobson.png",
          "webp": "./images/avatars/image-amyrobson.webp"
        },
        "username": "amyrobson"
      },
 */

const Container = styled.div`
display: flex;
flex-direction: column;
margin: ${props => !props.hasReply ? '1rem 1rem 1rem 1.8rem ' : '1rem'};
background-color: var(--white);
padding: 0.5rem 1rem;
border-radius: 5px;

>*{
    margin: 8px 0;
}
`
const Header = styled.div`
display: flex;
align-items: center;

>*{
    margin-right: 20px;
}
`

const Avatar = styled.img`
width: 32px;
`

const UserName = styled.div`
display: flex;

font-weight: bold;
`

const When = styled.div``

const Body = styled.div``

const Footer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color: var(--moderate-blue);
font-weight: bolder;
`

const Score = styled.div`
display: flex;
align-items: center;
background-color: var(--light-gray);
border-radius: 8px;

>*{
    padding: 8px 6px;
}

>:first-child{
    padding-left: 12px;
}

>:last-child{
    padding-right: 12px;
}

`

const Reply = styled.div`
display: flex;
align-items: baseline;
cursor: pointer;

>:nth-child(1){
    margin-right: 8px;
}`
const You = styled.div`
padding: 0 5px 4px 5px;
background-color: var(--moderate-blue);
color: var(--white);
border-radius: 5px;
margin-left: 5px;
`
const Buttons = styled.div`
display: flex;
`
const Delete = styled.div`
color: var(--soft-red);
cursor: pointer;

>span{
    margin: 0 14px 0 7px;
}
`
const Edit = styled.div`
color: var(--moderate-blue);
cursor: pointer;

>span{
    margin: 0 7px;
}`

const CommentCard = ({ card, currentUser }) => {
    const itIsMe = currentUser.username === card.user.username

    return (
        <>
            <Container hasReply={card.replies}>
                <Header>
                    <Avatar src={img1}></Avatar>
                    <UserName>
                        {card.user.username}
                        {itIsMe && <You>you</You>}
                    </UserName>
                    <When>{card.createdAt}</When>
                </Header>
                <Body>
                    {card.content}
                </Body>
                <Footer>
                    <Score>
                        <img src={iconPlus} />
                        <span>{card.score}</span>
                        <img src={iconMinus} />
                    </Score>
                    {itIsMe ? (
                        <Buttons>
                            <Delete>
                                <img src={iconDelete} />
                                <span>Delete</span>
                            </Delete>
                            <Edit>
                                <img src={iconEdit} />
                                <span>Edit</span>
                            </Edit>
                        </Buttons>
                    ) : (
                        <Reply>
                            <img src={iconReply} />
                            <span>Reply</span>
                        </Reply>
                    )}
                </Footer>
            </Container>
            {card.replies && card.replies.map((c, i) => <CommentCard key={i} card={c} currentUser={currentUser} />)}
        </>
    )
}

export default CommentCard;