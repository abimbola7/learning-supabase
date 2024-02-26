import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export const useSupabase  = () => {
  const router = useRouter();
  const getSession = async () => {
    const {
      data : {
        session
      }
    } = await supabase.auth.getSession()
    const { refresh_token, access_token } = session;
    setSession(access_token, refresh_token)
    return session
  }

  const refreshSession = async () => {
    const { data, error } = await supabase.auth.refreshSession()
    return session;
  }

  const setSession = async (access_token, refresh_token) => {
    console.log(access_token, refresh_token)
    const {
      data : {
        session
      }
    } = await supabase.auth.setSession({
      access_token,
      refresh_token
    })
    console.log(session)
    return true;
  }

  const logOut  = async () => {
    await supabase.auth.signOut()
    router.refresh();
  }

  return {
    getSession,
    setSession,
    refreshSession,
    logOut
  }

}