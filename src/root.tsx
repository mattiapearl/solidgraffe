type Entity = {
    id: number,
    name: string,
    owner_id: string,
    created_ad: string,
    type: string,
    address: string,
    additional_data: object
}

// @refresh reload
import { Suspense, createEffect, createSignal } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { supabase } from '~/components/supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import Account from '~/components/Account'
import Auth from '~/components/Auth'
import EntityList from "./components/EntityList";
import "./root.css";

export default function Root() {

    const [session, setSession] = createSignal<AuthSession | null>(null);
    
  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { 
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

  })

  const [currentEntity, setCurrentEntity] = createSignal<Entity | null>(null);

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <div class="container" style={{ padding: '50px 0 100px 0' }}>
                {!session() ? <Auth /> : <Account session={session()!} />}
            </div>
            <EntityList entities={[] as Entity[]} setEntity={setCurrentEntity} currentEntity={currentEntity} />
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
      </Html>
  );
}
