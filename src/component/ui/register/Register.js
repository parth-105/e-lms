"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { uploadFileAndGetUrl } from "@/helpers/firebaseUtils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast"

const MyComponent = () => {


    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', isInstructor: false, photoURL: '' });
    const { toast } = useToast()
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState('');

    const handleOnChange = (e) => {
        setIsChecked(!isChecked);
        console.log("Signup failed", e.target.checked);
        setFormData({ ...formData, isInstructor: e.target.checked })
    };



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
    };

    const handelprevclick = () => {
        setProfilePic(null);
        setPreview('')
    }

    const onSignup = async () => {
        if (!formData.name || !formData.email ||  !formData.password  ) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
            });
            return;
        }
        try {
            setLoading(true);
            const pic = await uploadFileAndGetUrl(profilePic);
            console.log("log user1", formData)
            const response = await axios.post("/api/register-instructor", { ...formData, photoURL: pic });

            console.log("log user", formData)
            console.log("Signup success", response.data);
            if (response.data.pending) {
                router.push("/pendingpage");
            }
            else {
                toast({
                    title: "Your Are Register Successfully",
                    description: "Now Login !!",
                  })
                router.push("/login");
              
            }

        } catch (error) {
            console.log(error.message);
            toast({
                title: "Some this went wrong",
                description: "Plese keep passions",
              })
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
        <form className="min-h-screen flex items-stretch text-white">
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
                        <Label htmlFor="courseThumbnail">Profile Picture</Label>
                            {!preview && (<Input type="file"  required  accept="image/*" onChange={handleProfilePicChange} className="w-full px-3 py-2 border rounded" />)}
                            {preview && <img src={preview} alt="Profile Preview" className="mt-4 w-32 h-32 object-cover rounded-full" onClick={handelprevclick} />}
                        </div>

                        <div className="pb-2 pt-4">
                            <input
                                type="text"
                                name="name"
                                required
                                onChange={handleChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-black rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Name" />
                        </div>
                        <div className="pb-2 pt-4">
                            <input
                                type="email"
                                name="email"
                                required
                                onChange={handleChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-black rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Email" />
                        </div>


                        <div className="pb-2 pt-4">
                            <input
                                type="password"
                                name="password"
                               
                                onChange={handleChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-black rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Password"
                                required />
                        </div>

                        <div className="pb-2 pt-4">
                            <div className="flex items-start">
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
                            </div>
                        </div>

                        <div className="px-4 pb-2 pt-4">
                            <button
                                onClick={onSignup}
                                className=" bg-blue-600 text-white hover:bg-blue-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="button">
                                {loading ? "loding" : "Signup"}
                            </button>
                        </div>

                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already have Register?
                            <Link href="/login"
                                className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    );
};

export default MyComponent;
