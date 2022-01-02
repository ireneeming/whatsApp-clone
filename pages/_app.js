import '../styles/globals.css';
import {auth, db} from '../firebase';
import {useAuthState} from "react-firebase-hooks/auth"
import Login from './login';
import Loading from '../components/Loading';
import firebase from 'firebase/compat/app';
import {useEffect} from 'react';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(()=>{
    if(user){
      db.collection('users').doc(user.uid).set({
        email:user.email,
        lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
      }, 
      {merge:true});
    }
  },[user]);

  //새로고침 할 때 로딩되는 기간동안 로딩돌리기 performance
  //better-react-spinkit 이용해서 Loading.js circle 만들기
  //if(true) return <Loading/>;

  if(loading) return <Loading/>;
  if(!user) return <Login/>


  return <Component {...pageProps} />
}

export default MyApp;
