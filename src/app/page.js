"use client"
import React from "react";
import { useNavigation } from "./(hooks)/useNavigation";
import { useSupabase } from "./(hooks)/useSupabase";
import { useArticles } from "./(hooks)/useArticles";
import { useViews } from "./(hooks)/useViews";
import { supabase } from "@/lib/supabase";
import ArticleItem from "./(components)/articleitem";

export default function Home() {
  const {
    router
  } = useNavigation()
  const {
    getSession,
    setSession,
    refreshSession,
    logOut
  } = useSupabase();
  const {
    articles,
    getArticles,
    // subscribeToArticles
  } = useArticles()

  const {
    views,
    getViews
   } = useViews()


  // subscribeToArticles();
  supabase
    .channel('articles-follow-up')
    .on('postgres_changes', {
      event : "*",
      schema : "public",
      table : "votes"
    }, async (payload)=>{
      console.log(payload)
      await getArticles()
    })
    .subscribe();

  // const unSubscribeFromArticles = () => {
  //   supabase.removeChannel(subscribedChannel)
  // }
  React.useEffect(()=>{
    getSession();
    getArticles();
    getViews();
  }, [])

  console.log(articles)
  console.log(views)
  return (
    <div className="flex my-2 flex-col container mx-auto">
      <h1 className="">Logged In</h1>
      {/* <button className="" onClick={unSubscribeFromArticles}>UnSubscribe</button> */}
      <ul className="grid gap-4 ">
        {
          articles.map(article=>(
              <ArticleItem key={article.id} id={article.id} created_at={article.created_at} title={article.title} votes={article.votes}/>
          ))
        }  
      </ul>
      <div className="w-fit">
        <button 
        onClick={logOut}
        className="py-1 px-3 rounded-md text-white bg-red-400"
        >Log out</button>
      </div>
    </div>
  );
}
