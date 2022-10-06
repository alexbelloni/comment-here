import React, { useState, useEffect } from 'react';

import CommentCard from '../../components/CommentCard';
import GetPosts from '../../api/GetPosts';
import AddCommentCard from '../../components/AddCommentCard';

const CommentList = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [commentCards, setCommentCards] = useState([]);

    useEffect(() => {
        setCurrentUser(GetPosts.currentUser)
        setCommentCards(GetPosts.comments)
    }, [])

    return (
        <div>
            <div>
                {commentCards.map((card, i) => <CommentCard key={i} card={card} currentUser={currentUser} />)}
            </div>
            <AddCommentCard />
        </div>

    )
}

export default CommentList;