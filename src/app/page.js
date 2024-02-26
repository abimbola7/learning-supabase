"use client"
import { supabase, supabaseAdmin } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  // const setNewView = async () => {
  //   console.log("Setting new view")
  //   const data = await supabaseAdmin
  //     .from("views")
  //     .insert({
  //       name : "random name"
  //     })
  //   console.log(data)
  // };

  // setNewView()

  const logOut  = async () => {
    await supabase.auth.signOut()
    router.refresh();
  }
  return (
    <div className="flex my-2">
      <button 
      onClick={logOut}
      className="py-1 px-3 rounded-md text-white bg-red-400"
      >Log out</button>
    </div>
  );
}
