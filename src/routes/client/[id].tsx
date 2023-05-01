import { useParams } from "solid-start";
import { supabase } from '~/components/supabaseClient'
import { AuthSession } from '@supabase/supabase-js'

export default function ClientPage() {
  //Validate route
  async function checkId
  
  const params = useParams();
  return <div>User {params.id}</div>;
}
