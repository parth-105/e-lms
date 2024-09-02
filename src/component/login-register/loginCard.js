"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import useLocalStorage from "@/helpers/useLocalStorage.js";

export default function LoginComponent() {

    const router = useRouter();
    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        isInstructor: false,
       
    })
   

    const [isChecked, setIsChecked] = useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleOnChange = (e) => {
      setIsChecked(!isChecked);
      console.log(" cheked value", e.target.checked);
      setUser({ ...user, isInstructor: e.target.checked })
    };


    const onLogin = async () => {
        try {
            setLoading(true);
            console.log("user",user)
            const response = await axios.post("/api/login", user);
            console.log('lr',response)
           localStorage.setItem('e-learning-user', JSON.stringify(response.data.Login));
            console.log("Login success", response.data);

            if(response.data.pending){
              router.push("/pendingpage"); 
            }
            else{
              if(response.data.Login.isInstructor)
              {
                router.push("/instructor");
              }
              else{
              router.push("/student");
              }
            }
        } catch (error) {
            console.log(error.message);
            
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

  return (
    <div className="max-w-2xl mx-auto">
  <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Login</h3>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your email</label>
        <input 
        type="email" 
        name="email" 
        id="email" 
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
        placeholder="name@company.com" 
        required />
      </div>


      <div>
        <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your password</label>
        <input 
        type="password" 
        name="password" 
        id="password" 
        placeholder="••••••••" 
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
        required />
      </div>

      <div className="flex items-start">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input 
            id="remember" 
            checked={isChecked}
            onChange={handleOnChange}
            aria-describedby="remember" 
            type="checkbox" 
            className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" 
             />      
          </div>  
          <div className="text-sm ml-3">
            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">login as instructor</label>
          </div>
        </div>
      </div>


      <button 
      type="submit" 
      onClick={onLogin}
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {loading ? "loding" :"Login"}
        </button>

      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?
          <Link href="/signup"
          className="text-blue-700 hover:underline dark:text-blue-500"> signup</Link>
      </div>
    </div>
  </div>
</div>

  )
}

