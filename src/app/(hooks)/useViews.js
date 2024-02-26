import { supabase } from "@/lib/supabase";
import React from "react";

export const useViews = () => {
  const [ views, setViews ] = React.useState([]);

  const getViews = async () => {
    const { data, errors } = await supabase
    .from("views") //rlspolicies
    .select("*")
    
    if (data) {
      console.log(data)
      setViews(data)
    }
  }
  return {
    views,
    getViews
  }
}