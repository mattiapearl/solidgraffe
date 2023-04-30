import { Title } from "solid-start";
import Counter from "~/components/Counter";
import { supabase } from '~/components/supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import { createSignal } from "solid-js";

export default function Home(session:AuthSession) {
  const [currentEntity, setCurrentEntity] = createSignal<{id: string|null, type:string|null}>({id:null, type:null})

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}