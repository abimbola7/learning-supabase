"use client"

import React from 'react'
import { LetsIconsArrowDown, LetsIconsArrowTop } from './icons/icons'
import { useArticles } from '../(hooks)/useArticles'


const ArticleItem = ({ id, created_at, title, votes:myvotes }) => {
  const { newVote }  = useArticles()
  return (
    <li className='border px-4 py-3 cursor-pointer hover:bg-gray-900 flex items-center justify-between'>
      <h2>{title}</h2>
      <div className='grid place-items-center text-center'>
        <LetsIconsArrowTop className="text-3xl cursor-pointer" onClick={()=>newVote(id)}/>
        <span>{myvotes.length} votes</span>
        <LetsIconsArrowDown className="text-3xl" onClick={()=>newVote(id, true)}/>
      </div>
    </li>
  )
}

export default ArticleItem