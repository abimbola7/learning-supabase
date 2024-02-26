import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const useNavigation = () => {
  const [ loading, setLoading ] = React.useState(false);
  const [ open, setOpen ] = React.useState(false); 
  const [ active, setActive ] = React.useState("");
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()  
  return {
    open,
    setOpen,
    active, 
    setActive,
    loading,
    setLoading,
    router,
    pathname,
    params,
    searchParams
  }
}

