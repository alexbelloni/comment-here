import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import amyrobson from '../../images/avatars/image-amyrobson.png'
import juliusomo from '../../images/avatars/image-juliusomo.png'
import maxblagun from '../../images/avatars/image-maxblagun.png'
import ramsesmiron from '../../images/avatars/image-ramsesmiron.png'
import iconReply from '../../images/icon-reply.svg';
import iconMinus from '../../images/icon-minus.svg';
import iconPlus from '../../images/icon-plus.svg';
import iconDelete from '../../images/icon-delete.svg';
import iconEdit from '../../images/icon-edit.svg';

const images = { amyrobson, juliusomo, maxblagun, ramsesmiron }

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

@media (min-width: 1440px){
    margin: ${props => !props.hasReply ? '1rem 1rem 1rem 6rem ' : '1rem'};
}
`
const Header = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const HeaderMain = styled.div`
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
font-weight: 700;
`

const When = styled.div``

const BodyLine = styled.div`
display: flex;

>:nth-child(1){
    display: none;
}

@media (min-width: 1440px){
    >:nth-child(1){
        display: flex;
    }
}
`

const Body = styled.div`
margin: 15px 0;
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

>img{
    cursor: pointer;
}

>img:hover{
    filter: contrast(50%);
}

`

const ScoreDesktop = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background-color: var(--light-gray);
color: var(--moderate-blue);
border-radius: 5px;
color: var(--moderate-blue);
font-weight: 500;
margin-right: 25px;
max-height: 120px;

>span{
    min-width: 18px;
    text-align: center;
}

>*{
    padding: 12px 14px;
}

>:first-child{
    padding-top: 12px;
}

>:last-child{
    padding-bottom: 12px;
    
}

>div{
    cursor: pointer;
    width: 13px;
    display:flex;
    justify-content: center;
    border: solid var(--light-gray);
    border-radius: 5px;
}

>div>img:hover{
    filter: contrast(50%);
}

`
const CommentArea = styled.div`
width: 100%;
`

const Reply = styled.div`
display: flex;
align-items: baseline;
cursor: pointer;

>:nth-child(1){
    margin-right: 8px;
}

:hover{
    opacity: 0.5;
}
`
const You = styled.div`
padding: 0 5px 4px 5px;
background-color: var(--moderate-blue);
color: var(--white);
border-radius: 5px;
margin-left: 5px;
`
const ReplyingTo = styled.span`
color: var(--moderate-blue);
margin-right: 5px;

::before {
    content: '@';
}
`
const Buttons = styled.div`
display: flex;
`
const ButtonsDesktop = styled.div`
display: none;

@media (min-width: 1440px){
    display: flex;
}
`
const Delete = styled.div`
color: var(--soft-red);
cursor: pointer;

>span{
    margin: 0 14px 0 7px;
}

:hover{
    opacity: 0.5;
}
`
const Edit = styled.div`
color: var(--moderate-blue);
cursor: pointer;

>span{
    margin: 0 7px;
}

:hover{
    opacity: 0.5;
}`
const TextArea = styled.textarea`
width: -webkit-fill-available;
margin: 10px 0;
border-color: var(--grayish-blue);
border-radius: 5px;
padding: 8px 15px;
opacity: 0.8;
cursor: pointer;
width: -webkit-fill-available;

:hover{
    opacity: 1;
}

@media (min-width: 1440px){
    width: -webkit-fill-available;
}
`
const Button = styled.div`
background-color: var(--moderate-blue);
color: var(--white);
font-weight: 700;
padding: 10px 25px;
border-radius: 5px;
cursor: pointer;
height: 20px;
width: 67px;

:hover{
    opacity: 0.5;
}
`

const EditArea = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`
const CommentCard = ({ card, cardScore, currentUser, onDelete, currentReply, onReply, currentEdit, onEdit, onEditEnded, changeScore }) => {
    const [score, setScore] = useState(0)
    const [content, setContent] = useState(card.content)
    const itIsMe = currentUser.username === card.user.username

    useEffect(() => {
        setScore(cardScore)
    }, [cardScore])

    return (
        <>
            <Container hasReply={card.replies} id={card.id}>
                <BodyLine>
                    <ScoreDesktop>
                        <div>
                            <img src={iconPlus} onClick={() => changeScore(card.id, 1)} />
                        </div>
                        <span>{score}</span>
                        <div>
                            <img src={iconMinus} onClick={() => changeScore(card.id, 0)} />
                        </div>
                    </ScoreDesktop>
                    <CommentArea>
                        <Header>
                            <HeaderMain>
                                <Avatar src={images[card.user.username]}></Avatar>
                                <UserName>
                                    {card.user.username}
                                    {itIsMe && <You>you</You>}
                                </UserName>
                                <When>{card.createdAt}</When>
                            </HeaderMain>

                            <ButtonsDesktop>
                                {itIsMe ? (
                                    <Buttons>
                                        <Delete onClick={onDelete}>
                                            <img src={iconDelete} className={`delete-${card.id}`} />
                                            <span className={`delete-${card.id}`}>Delete</span>
                                        </Delete>
                                        <Edit onClick={e => onEdit(e)}>
                                            <img src={iconEdit} className={`edit-${card.id}`} />
                                            <span className={`edit-${card.id}`}>Edit</span>
                                        </Edit>
                                    </Buttons>
                                ) : (
                                    <Reply onClick={e => onReply(e, card.user.username)}>
                                        <img src={iconReply} className={`reply-${card.id}`} />
                                        <span className={`reply-${card.id}`}>Reply</span>
                                    </Reply>
                                )}
                            </ButtonsDesktop>
                        </Header>

                        <Body>

                            {currentEdit.index != card.id && (
                                <>
                                    {card.replyingTo && <ReplyingTo>{card.replyingTo}</ReplyingTo>}
                                    {card.content}
                                </>
                            )}
                            {currentEdit.index == card.id && (
                                <EditArea>
                                    <TextArea rows="5" cols="33" placeholder='Add a comment...'
                                        onChange={e => setContent(e.target.value)}
                                        value={content}>
                                    </TextArea>
                                    <Button onClick={() => { onEditEnded(card.id, content) }}>UPDATE</Button>
                                </EditArea>
                            )}
                        </Body>

                        <Footer>
                            <Score>
                                <img src={iconPlus} onClick={() => changeScore(card.id, 1)} />
                                <span>{score}</span>
                                <img src={iconMinus} onClick={() => changeScore(card.id, 0)} />
                            </Score>
                            {itIsMe ? (
                                <Buttons>
                                    <Delete onClick={onDelete}>
                                        <img src={iconDelete} className={`delete-${card.id}`} />
                                        <span className={`delete-${card.id}`}>Delete</span>
                                    </Delete>
                                    <Edit onClick={e => onEdit(e, content)}>
                                        <img src={iconEdit} className={`edit-${card.id}`} />
                                        <span className={`edit-${card.id}`}>Edit</span>
                                    </Edit>
                                </Buttons>
                            ) : (
                                <Reply onClick={onReply}>
                                    <img src={iconReply} className={`reply-${card.id}`} />
                                    <span className={`reply-${card.id}`}>Reply</span>
                                </Reply>
                            )}
                        </Footer>
                    </CommentArea>

                </BodyLine>
                {currentReply.index == card.id && currentReply.comp}
            </Container>
            {card.replies && card.replies.map(d => {
                return { ...d, createdAtDays: d.createdAt.indexOf('month') > 0 ? 30 : d.createdAt.indexOf('week') > 0 ? 7 : d.createdAt.indexOf('day') > 0 ? 1 : 0 }
            }).sort((a, b) => {
                if (a.createdAtDays < b.createdAtDays) {
                    return -1;
                }
                if (a.createdAtDays > b.createdAtDays) {
                    return 1;
                }
                return 0;
            }).map((c, i) => (
                <CommentCard key={i}
                    card={c}
                    currentUser={currentUser}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    currentEdit={currentEdit}
                    onReply={onReply}
                    currentReply={currentReply}
                    changeScore={(id, isAdding) => changeScore(id, isAdding, card.id)}
                    cardScore={c.score}
                    onEditEnded={onEditEnded}
                />
            )
            )}
        </>
    )
}

export default CommentCard;