"use client"
import { useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [login, setLogin] = useState({ username: "", password: "" })

  const handleInputs = (event: any) => {
    setLogin({ ...login, [event.target.name]: event.target.value })
  }
  const submitForm = async (event: any) => {
    event.preventDefault()
    console.log(login)
    try {
      const createUserLogin = await axios.post("http://localhost:3001/user-login", {
        ...login
      })
      const { data } = createUserLogin
      localStorage.setItem("access-token", data.access_token)
      router.push('/chatbox')
      console.log(createUserLogin)
    }
    catch (error) { console.log(error) }

  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={submitForm} className="space-y-6" action="#" >
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input id="username" name="username" type="text" onChange={(event) => handleInputs(event)} autoComplete="username" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input id="password" name="password" onChange={(event) => handleInputs(event)} type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
