import React from 'react';
import styled from 'styled-components';

import CommentList from '../../containers/CommentList';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Comments = () => {
    return (
        <Container>
            <CommentList />
        </Container>

    )
}

export default Comments;