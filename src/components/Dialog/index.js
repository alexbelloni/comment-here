import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'

Modal.setAppElement('#root');

const Title = styled.div`
font-size: 1.1em;
font-weight: 700;
`

const Content = styled.div`
max-width: 280px;
line-height: 1.5;
margin: 15px 0;
`

const Buttons = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;
`

const Button = styled.div`
background-color: var(${props => props.colorName});
color: var(--white);
font-weight: 500;
padding: 10px 15px;
border-radius: 5px;
cursor: pointer;

> span{
    text-transform: uppercase;
}

:hover{
    opacity: 0.5;
}
`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Dialog = ({ title, onClose, isOpen, onDelete }) => {

    function closeModal() {
        onClose();
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={title}
            >
                <Title>{title}</Title>
                <Content>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</Content>
                <Buttons>
                    <Button colorName="--grayish-blue"
                        onClick={onClose}>
                        <span>no, cancel</span>
                    </Button>
                    <Button colorName="--soft-red"
                        onClick={onDelete}>
                        <span>yes, delete</span>
                    </Button>
                </Buttons>
            </Modal>
        </div>
    );
}

export default Dialog;