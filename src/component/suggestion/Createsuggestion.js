'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/helpers/useLocalStorage.js';
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const Createsuggestion = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [data] = useLocalStorage('e-learning-user', '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!formData.title || !formData.category || !formData.description) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
        });
        setLoading(false);
        return;
      }
      await axios.post("/api/suggestion/addsuggestion", {
        topic: formData.title,
        subject: formData.category,
        description: formData.description,
        author: data.name,
        student: data._id,
        photoURL: data.photoURL,
      });

      if (data.isInstructor) {
        router.push('/instructor');
      } else {
        router.push('/student');
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-10 mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Share Your Suggestion</h2>
          <p className="text-gray-600 mt-1">Help us improve our learning platform with your valuable feedback</p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Suggestion Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a clear, concise title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Javascript">Javascript</option>
                <option value="React">React</option>
                <option value="Node">Node</option>
                <option value="MongoDB">MongoDB</option>
                <option value="GK">GK</option>
                <option value="ML">ML</option>
                <option value="ebusiness">E-Business</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your suggestion in detail..."
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:scale-105"
              >
                <Send className="mr-2 h-4 w-4" />
                {loading ? "Submitting..." : "Submit Suggestion"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 flex items-center text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          Your suggestions help us create a better learning experience for everyone
        </div>
      </div>
    </div>
  );
};

export default Createsuggestion;
