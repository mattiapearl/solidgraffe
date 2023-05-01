import { useParams } from "solid-start";
import { supabase } from '~/components/supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import useAuth from '~/components/AuthContext'
import { redirect } from "solid-start/server";

export default function ClientPage() {
  const [session] = useAuth();

  if(!session()){
     redirect("/");
  }
  
  //Validate route
  async function checkId
  
  const params = useParams();
  return <div>User {params.id}</div>;
}
