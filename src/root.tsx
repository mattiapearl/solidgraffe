const mySecret = process.env['VITE_SUPABASE_URL']
type Entity = {
    id: number,
    name: string,
    owner_id: string,
    created_at: string,
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
import {AuthProvider, useAuth} from '~/components/AuthContext'
import EntityList from "./components/EntityList";
import "./root.css";

export default function Root() {
  const [session] = useAuth();
  
  const [entities, setEntities] = createSignal<Entity[] | null[]>([])
  const [currentEntity, setCurrentEntity] = createSignal<Entity | null>(null);
  createEffect(()=>{
    getUserEntities()
  }) 

  async function getUserEntities(){
  const {data} = await supabase.from("entity").select() ;
    setEntities(data as Entity[]);
  }
  
  return (
    <AuthProvider>
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
            <EntityList entities={entities() == null ? []: entities()} setEntity={setCurrentEntity} currentEntity={currentEntity()} />
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
      </Html>
    </AuthProvider>
      );
}
