"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useLocalStorage from "@/helpers/useLocalStorage.js";

import { useToast } from "@/hooks/use-toast"


const MyComponent = () => {

    const { toast } = useToast()
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
        if ( !user.email || !user.password  ) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
            });
            return;
        }
        try {
            setLoading(true);
            console.log("user", user)
            const response = await axios.post("/api/login", user);
            console.log('lr', response)
            // localStorage.setItem('e-learning-user', JSON.stringify(response.data.Login));
            console.log("Login success", response.data);

            if (response.data.pending) {
                router.push("/pendingpage");
              //  localStorage.setItem('e-learning-user', '');
            }
            else {
                if (response.data.Login.isInstructor) {
                    localStorage.setItem('e-learning-user', JSON.stringify(response.data.Login));
                    router.push("/instructor");
                    toast({
                        title: "Instructor Login Successfull!",
                        description: "Keep Teaching !",
                      })
                }
                else {
                    router.push("/student");
                    localStorage.setItem('e-learning-user', JSON.stringify(response.data.Login));
                    toast({
                        title: "Student Login Successfull!",
                        description: "Enjoy Your Learning !",
                      })
                }
                setLoading(false);
            }
        } catch (error) {

            console.log(error.message);
            toast({
                title: "Login Faild",
                description: "Something Went Wrong!!!!",
              })

        } 
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <section className="min-h-screen flex items-stretch text-white">
            <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                    <p className="text-3xl my-4">Capture your personal memory in unique way, anywhere.</p>
                </div>
            </div>
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundColor: '#161616' }}>
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <div className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                        <div className="pb-2 pt-4">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-black rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="name@company.com"
                                required />
                        </div>
                        <div className="pb-2 pt-4">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-black rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                required />
                        </div>

                        <div className="pb-2 pt-4">
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
                                        <label htmlFor="remember" className="font-medium text-white dark:text-gray-300">login as instructor</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 pb-2 pt-4">
                            <button
                                type="submit"
                                onClick={onLogin}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {loading ? "loding" : "Login"}
                            </button>
                        </div>

                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?
                            <Link href="/signup"
                                className="text-blue-700 hover:underline dark:text-blue-500"> signup</Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyComponent;
