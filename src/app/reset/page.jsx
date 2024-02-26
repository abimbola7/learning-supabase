"use client"
import { supabase } from '@/lib/supabase'
import React from 'react'
import { useRouter } from 'next/navigation'



const Reset = () => {
  const router  = useRouter();
  const [ success, setSuccess ] = React.useState(false);
  const [ resetPassword, setResetPassword ] = React.useState(false);
  const [datas, setDatas] = React.useState({
    password : '',
    confirmPassword : '',
  })

  
  const handleChange = (e) => {
    const { name, value } = e.target
    setDatas((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  const confirmPasswords  = async () => {
    const { password, confirmPassword  } =   datas
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    const { data, error  } = await supabase.auth.updateUser({
      password : datas.password
    })
    if (data) console.log(data)
    if (error) console.log(error)
  }

  return (
    <div className='container mx-auto w-[400px] text-gray-500 space-y-4'>
      <div className='gap-4 grid'>
        <div className="grid">
          <label htmlFor="" >Enter your new password</label>
          <input 
          type="password" 
          name='password'
          value={datas?.password}
          onChange={handleChange}
          />
        </div>
        <div className="grid">
          <label htmlFor="">Confirm your new password</label>
          <input 
          type="password" 
          name='confirmPassword'
          value={datas?.confirmPassword}
          onChange={handleChange}
          />
        </div>
        {/* {
          success && <div className='my-4 bg-green-100 px-2 text-green-600'>An Email has been sent to { datas.email }</div>Y
        } */}
        <div className='mt-5'>
          <button onClick={confirmPasswords} className='bg-blue-400 px-4 py-1 rounded-md text-white'>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Reset