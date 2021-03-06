import styled from 'styled-components';
import Head from 'next/head';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { auth, db } from '../../firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import getRecipientEmail from '../../utils/getRecipientEmail';

function Chat({chat, messages}) {

  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen/>
      </ChatContainer>
    </Container>
  )
}

export default Chat;

export async function getServerSideProps (context) {
  const ref = db.collection("chats").doc(context.query.id);
  
  //PREP the messages on the server
  const messageRes = await ref
    .collection('messages')
    .orderBy('timestamp','asc')
    .get();

    const messages = messageRes.docs.map(doc => ({
      id: doc.id,
      ...doc.date()
    })).map(messages=>({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }));

    //PREP the chats on
    const chatRes = await ref.get();
    const chat = {
      id:chatRes.id,
      ...chatRes.data()
    }

    console.log(chat, messages);
    return{
      props: {
        messages: JSON.stringify(messages),
        chat: chat
      }
    }
}

const Container = styled.div`
display:flex;
`;

const ChatContainer = styled.div`
  flex:1;
  height:100vh;
  overflow:scroll;

  ::-webkit-scrollbar {
    display:none;
  }
  -ms-overflow-style: none;/*IE and Edge*/
  scrollbar-width:none; /*Firefox*/
`;

//2:22:16 ChatScreen 부터 다시 시작