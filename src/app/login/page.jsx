"use client"
import { supabase } from '@/lib/supabase'
import React from 'react'
import { useRouter } from 'next/navigation'



const Login = () => {
  console.log(window.location.href)
  const router  = useRouter();
  const [ success, setSuccess ] = React.useState(false);
  const [ resetPassword, setResetPassword ] = React.useState(false);
  const [datas, setDatas] = React.useState({
    email: '',
    password : ''
  })

  const login = async () => {
    try {
      let { data, error } = await supabase
        .auth
        .signInWithPassword({
        // email: datas.email,
        email: datas.email,
        password: datas.password,
        // options : {
        //   shouldCreateUser : true
        // }
      })
      // if (data) {
      //   setSuccess(true)
      // }
      if (data) {
        const { user } = data
        if (user){
          // setSuccess(true)
        }
        console.log(data)
        // router.refresh()
      }
      if (error) console.log(error)
    }catch(error){
      console.log(error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setDatas((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  const sendResetPassword  = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        datas.email,
        {
          redirectTo : `${window.location.href}reset`
        }
      )
      setSuccess(true)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className='container mx-auto w-[400px] text-gray-500 space-y-4'>
      {
        !resetPassword && (
          <div className='gap-4 grid'>
            <div className="grid">
              <label htmlFor="" >Email</label>
              <input 
              type="text" 
              name='email'
              value={datas?.email}
              onChange={handleChange}
              />
            </div>
            <div className="grid">
              <label htmlFor="">Password</label>
              <input 
              type="password" 
              name='password'
              value={datas?.password}
              onChange={handleChange}
              />
            </div>
            {/* {
              success && <div className='my-4 bg-green-100 px-2 text-green-600'>An Email has been sent to { datas.email }</div>Y
            } */}
            <div className='mt-5'>
              <button onClick={login} className='bg-blue-400 px-4 py-1 rounded-md text-white'>Signup</button>
            </div>
          </div>
        )
      }
      {
        resetPassword && (
          <div className="my-2 grid gap-4">
            <div className="grid">
              <label htmlFor="" >Email</label>
              <input 
              type="text" 
              name='email'
              value={datas?.email}
              onChange={handleChange}
              />
            </div>
            {
              success && (
                <p className='bg-green-50 text-green-600 px-2 rounded'>Success! Check your email to reset your password</p>
              )
            }
            <button className='text-white rounded-md bg-blue-400 py-1 px-3' onClick={sendResetPassword}>Reset My Password</button>
          </div>
        )
      }
      <div>
        <div className=''>
          <button className='text-white' onClick={() => setResetPassword(!resetPassword)}>{ !resetPassword ? "Reset My Password" : "Login" }</button>
        </div>
      </div>
    </div>
  )
}

export default Login