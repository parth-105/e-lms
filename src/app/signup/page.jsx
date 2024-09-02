"use client";


 import Link from "next/link";
// import React, { useEffect, useState } from "react";
 import { useRouter } from "next/navigation";
// import axios from "axios";
// import SignupCard from "@/component/SignupCard";

import { useState } from 'react';
import axios from 'axios';
import RegisterComponent from "@/component/login-register/registerCard";
import MyComponent from "@/component/ui/register/Register";



export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        await axios.post('/api/register-instructor', formData);
        alert('Registration successful, pending approval.');
      //  router.push("/admin");
    };


     
    // const [user, setUser] = React.useState({
    //     email: "",
    //     password: "",
    //     username: "",
    //      subject:"",
    //      isInstructor: false
    // })
    // const [buttonDisabled, setButtonDisabled] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);
    // const [isAdmin, setIsAdmin] = useState(false);
    // const [isChecked, setIsChecked] = useState(false);

    // const handleOnChange = (e) => {
    //     setIsChecked(!isChecked);
    //     console.log("Signup failed", e.target.checked);
    //     setUser({ ...user, isInstructor: e.target.checked })
    //   };

    // const handleRadioChange = (e) => {
    //     setIsAdmin(e.target.value === 'true');
    //     console.log('admin', isAdmin)
    // };
    // const onSignup = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await axios.post("/api/users/signup", user);
    //     //    localStorage.setItem("e-learning-user", user);
    //         console.log("log user",user)
    //         localStorage.setItem('e-learning-user', JSON.stringify(user));
    //         console.log("Signup success", response.data);
    //         router.push("/login");

    //     } catch (error) {
    //         console.log("Signup failed", error.message);


    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
    //         setButtonDisabled(false);
    //     } else {
    //         setButtonDisabled(true);
    //     }
    // }, [user]);


    return (

        <>
            {/* <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            <Link href="/admin">admin</Link> */}
            {/* <RegisterComponent/> */}
            <MyComponent/>
        </>

    )

}