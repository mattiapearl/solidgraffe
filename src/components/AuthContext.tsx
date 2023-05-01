import { createSignal, createContext, useContext } from "solid-js";
import { supabase } from '~/components/supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import Account from '~/components/Account'
import Auth from '~/components/Auth'

const AuthContext = createContext();

export function AuthProvider(props) {
   const [session, setSession] = createSignal<AuthSession | null>(null);
    
  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { 
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })
    store = [
      session
    ];

  return (
    <AuthContext.Provider value={store}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }