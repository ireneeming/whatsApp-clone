import styled from 'styled-components';
import {Avatar, IconButton, Button} from '@material-ui/core';

function Chat({id, users}) {
  return (
    <Container>
      <UserAvatar/>
      <p>Recipients email</p>
    </Container>
  )
}

export default Chat;

const Container = styled.div`
  display:flex;
  align-items: center;
  cursor:pointer;
  padding:15px;
  word-break: break;
  :hover{
    background-color:#e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
margin:5px;
margin-right:15px;
`;