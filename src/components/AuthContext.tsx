import { createSignal, createContext, createEffect, useContext } from "solid-js";
import { supabase } from '~/components/supabaseClient'
import { AuthSession } from '@supabase/supabase-js'

const AuthContext = createContext();

export function AuthProvider(props: any) {
  const [session, setSession] = createSignal<AuthSession | null>(null),
    store = [
      session
    ];

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

  return (
    <AuthContext.Provider value={store}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }