import { useEffect, useState } from 'react';
import './App.css'
import Auth from './Auth/Auth.js';
import ManageTasks from './ManageTasks/ManageTasks.js';
import { supabase } from './supabase/supabase-client.js';
import { manage_user_logout } from './api/userAuthentication.js';


const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);

  const fetchSession = async() => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
  };

  useEffect(()=>{
    fetchSession();

    const {data:authListener} = supabase.auth.onAuthStateChange((_event, session) =>{
      setSession(session);
    });

    return () =>{
      authListener.subscription.unsubscribe();
    }
  }, []);

  console.log('session :>> ', session);
  // user sign out
  const handle_user_logOut = async() => {
    try {
      await manage_user_logout();
      alert("User successfully signed out")
    } catch (error:any) {
      console.log('error :>> ', error.message);
    }
    
  }

  return (
    <>
      {
        session ? <div className='container'>
        <ManageTasks session={session} />
        <button 
          onClick={handle_user_logOut}
          className='status-change-btn'>LogOut</button>
        </div> 
        : <Auth />
      }
      
    </>
  )
};

export default App;