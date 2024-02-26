import { supabase } from "@/lib/supabase";
import React from "react";
import { useArticles } from "./useArticles";

export const useVotes = () => {
  const [ votes, setVotes ] = React.useState([]);
  const { articles, getArticles } = useArticles()

  const getVotes = async () => {
    const { data, errors } = await supabase
    .from("votes") //rlspolicies
    .select("*")
    
    if (data) {
      setVotes(data)
    }
  }
  
  const newVote = async (article_id, remove) => {
    console.log(article_id)
    const {
      data : {
        session
      }
    } = await supabase.auth.getSession();
    if (!session) {
      return alert("You need to be logged in to vote")
    }
    const { user : { id } } = session
    console.log(id)
    if (remove) {
      await supabase.from("votes").delete().eq("article_id", article_id).eq("user_id", id)
      return;
    }
    const { data, error } = await supabase
      .from("votes")
      .insert({
        article_id,
        user_id : id
      }).select().single()
      setVotes((prevVotes)=>({...prevVotes, data}))
  }
  console.log(votes)
  // const subscribeToArticles = () => {
  //   //subsscribe to a database:
  //  supabase
  //  .channel('articles-follow-up')
  //  .on('postgres_changes', {
  //    event : "*",
  //    schema : "public",
  //    table : "articles"
  //  }, (payload)=>{
  //    console.log(payload)
  //  })
  //  .subscribe();
  // }

  // const unSubscribeFromArticles = () => {
  //   supabase.removeChannel('articles-follow-up')
  // }

  return {
    votes, 
    getVotes,
    newVote
  }
}