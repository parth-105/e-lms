"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', isInstructor: false });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = (e) => {
    setIsChecked(!isChecked);
    console.log("Signup failed", e.target.checked);
    setFormData({ ...formData, isInstructor: e.target.checked })
  };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("log user1", formData)
      const response = await axios.post("/api/register-instructor", formData);

      console.log("log user", formData)
      console.log("Signup success", response.data);
      if(response.data.pending){
        router.push("/pendingpage"); 
      }
      else{
      router.push("/login");
      }

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 0 && formData.name.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  return (

    <section className="bg-blueGray-50">
      <div className="w-full lg:w-6/12 px-4 mx-auto pt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
        <div className="space-y-6">
          <div className=" justify-center items-center m-8 ">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create an account</h3>
          </div>
        
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Name" />
              </div>

              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email" />
              </div>

              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password" />
              </div>

              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    checked={isChecked}
                    onChange={handleOnChange}
                    type="checkbox"
                    className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" />
                  <span className="ml-2 text-sm font-semibold text-blueGray-600">
                    Register as instructor
                  </span>
                </label>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={onSignup}
                  className="bg-blueGray-800 text-black active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button">
                  {loading ? "loding" : "Signup"}
                </button>
              </div>

              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                
                Already have Register?
                <Link href="/login"
                  className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
              </div>

            </form>
            </div>
          </div>
        </div>
      </div>
    </section>


  )

}