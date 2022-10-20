import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CommentCard from '../../components/CommentCard';
import GetPosts from '../../api/GetPosts';
import AddCommentCard from '../../components/AddCommentCard';
import Dialog from '../../components/Dialog';
import ReplyCommentCard from '../../components/ReplyCommentCard';

const Container = styled.div`
display: flex;
flex-direction: column;
max-width: 700px;

@media (min-width: 1440px){
    max-width: 900px;
}
`

const CommentList = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [commentCards, setCommentCards] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteDialogObject, setDeleteDialogObject] = useState();
    const [currentReply, setCurrentReply] = useState({ index: -1 })
    const [currentEdit, setCurrentEdit] = useState({ index: -1 })
    const [posts, setPosts] = useState(GetPosts)

    useEffect(() => {
        setCurrentUser(posts.currentUser)
        setCommentCards(posts.comments.sort((a, b) => {
            if (a.score < b.score) {
                return 1;
            }
            if (a.score > b.score) {
                return -1;
            }
            // a must be equal to b
            return 0;
        }))
    }, [posts])

    const changeScore = (id, isAdding, owner) => {
        if (owner) {
            const index = commentCards.findIndex(c => c.id === owner)
            const list = commentCards[index]
            const index2 = list.replies.findIndex(c => c.id === id)
            list.replies[index2].score = isAdding ? list.replies[index2].score + 1 : list.replies[index2].score - 1;

            setCommentCards(commentCards.splice(0))
        } else {
            const index = commentCards.findIndex(c => c.id === id)
            commentCards[index].score = isAdding ? commentCards[index].score + 1 : commentCards[index].score - 1;

            commentCards.sort((a, b) => {
                if (a.score < b.score) {
                    return 1;
                }
                if (a.score > b.score) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            })

            setCommentCards(commentCards.splice(0))
        }

    }

    const handleReply = (e, replyingTo) => {
        setCurrentEdit({ index: -1 })
        const index = e.target.className.replace("reply-", "")
        setCurrentReply({ index, comp: <ReplyCommentCard onSend={(content) => { handleReplySend(index, content, replyingTo) }} /> })
    }

    const handleEdit = e => {
        const index = e.target.className.replace("edit-", "")
        setCurrentEdit({ index })
        setCurrentReply({ index: -1 })
    }

    const handleEditEnded = (id, content) => {

        const newComments = posts.comments.splice(0);
        const obj = findOwnerComment(newComments, id);
        if (!obj.isInternal) {
            newComments[obj.index].content = content;
        } else {
            newComments[obj.ownerIndex].replies[obj.index].content = content;
        }
        setPosts({ ...posts, comments: newComments })

        setCurrentEdit({ index: -1 })
        setCurrentReply({ index: -1 })
    }

    const handleDelete = e => {
        const id = e.target.className.replace("delete-", "")
        setDeleteDialogObject({ id })
        setIsDeleteDialogOpen(true)

        setCurrentEdit({ index: -1 })
        setCurrentReply({ index: -1 })
    }

    const handleFocusSend = e => {
        setCurrentEdit({ index: -1 })
        setCurrentReply({ index: -1 })
    }

    const handleSend = content => {
        const newComments = posts.comments.splice(0);

        newComments.push({
            "id": new Date().getMilliseconds(),
            "content": content,
            "createdAt": "a few seconds ago",
            "score": 0,
            "replies": [],
            "user": posts.currentUser,
        })

        setPosts({ ...posts, comments: newComments })
    }

    function findOwnerComment(newComments, ownerId) {
        let ownerIndex = newComments.findIndex(p => p.id == ownerId);
        if (ownerIndex >= 0) {
            return { comment: newComments[ownerIndex], isInternal: false, ownerIndex, index: ownerIndex }
        } else {
            let obj = null
            newComments.forEach(comment => {
                if (!obj && comment.replies) {
                    comment.replies.forEach((reply, index) => {
                        if (!obj && reply.id == ownerId) {
                            ownerIndex = newComments.findIndex(p => p.id == comment.id);
                            obj = { comment: reply, isInternal: true, ownerIndex, index }
                        }
                    })
                }

            });
            return obj
        }

    }

    const handleReplySend = (ownerId, content, replyingTo) => {
        const newComments = posts.comments.splice(0);

        const obj = findOwnerComment(newComments, ownerId);
        if (!obj.isInternal) {
            if (!obj.comment.replies) {
                newComments[obj.ownerIndex].replies = []
            }
            newComments[obj.ownerIndex].replies.push({
                "id": new Date().getMilliseconds(),
                "content": content,
                "createdAt": "a few seconds ago",
                "score": 0,
                "replyingTo": replyingTo,
                "user": posts.currentUser,
            })
        } else {
            newComments[obj.ownerIndex].replies.push({
                "id": new Date().getMilliseconds(),
                "content": content,
                "createdAt": "a few seconds ago",
                "score": 0,
                "replyingTo": replyingTo,
                "user": posts.currentUser,
            })
        }

        setPosts({ ...posts, comments: newComments })

        setCurrentEdit({ index: -1 })
        setCurrentReply({ index: -1 })
    }

    return (
        <Container>
            {commentCards.map((card, i) => {
                return (
                    <CommentCard key={i}
                        card={card}
                        cardScore={card.score}
                        currentUser={currentUser}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        currentEdit={currentEdit}
                        onReply={handleReply}
                        currentReply={currentReply}
                        changeScore={changeScore}
                        onEditEnded={handleEditEnded}
                    />
                )
            }
            )}
            <AddCommentCard
                onFocusSend={handleFocusSend}
                onSend={handleSend}
            />
            <Dialog isOpen={isDeleteDialogOpen}
                title="Delete comment"
                onClose={() => { setIsDeleteDialogOpen(false) }}
                onDelete={() => {

                    const newComments = posts.comments.splice(0);
                    const obj = findOwnerComment(newComments, deleteDialogObject.id);
                    if (!obj.isInternal) {
                        newComments.splice(obj.index, 1)
                    } else {
                        newComments[obj.ownerIndex].replies.splice(obj.index, 1)
                    }
                    setPosts({ ...posts, comments: newComments })
                    setIsDeleteDialogOpen(false)
                }}
            />
        </Container>

    )
}

export default CommentList;