import React, { useState } from 'react'
import Title from '../Components/Title'

function Login() {
  const [currentState, setCurrentState] = useState('Login') // 'Login' | 'Sign Up'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    // handle login / signup API call here
    console.log(currentState, formData)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-sm flex flex-col gap-5"
      >
        <div className="mb-2">
          <Title
            title1={currentState === 'Login' ? 'Log' : 'Sign'}
            title2={currentState === 'Login' ? 'In' : 'Up'}
          />
          <p className="text-gray-500 text-sm mt-3">
            {currentState === 'Login'
              ? 'Welcome back! Please enter your details.'
              : 'Create an account to get started.'}
          </p>
        </div>

        {currentState === 'Sign Up' && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            placeholder="Full name"
            required
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600 transition"
          />
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email address"
          required
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600 transition"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
          placeholder="Password"
          required
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600 transition"
        />

        <div className="flex justify-between text-sm text-gray-500 -mt-1">
          {currentState === 'Login' ? (
            <>
              <p className="cursor-pointer hover:text-slate-700 transition">
                Forgot your password?
              </p>
              <p
                onClick={() => setCurrentState('Sign Up')}
                className="cursor-pointer hover:text-slate-700 transition"
              >
                Create account
              </p>
            </>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer hover:text-slate-700 transition ml-auto"
            >
              Already have an account? Log in
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white tracking-widest text-sm py-4 mt-2 hover:bg-slate-800 transition"
        >
          {currentState === 'Login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </button>
      </form>
    </div>
  )
}

export default Login