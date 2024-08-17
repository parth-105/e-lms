"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await axios.get('/api/pending-instructors');
      console.log("ins",response)
      setInstructors(response.data.pendingInstructors);
    };
    fetchInstructors();
  }, []);

  const approveInstructor = async (id) => {
    await axios.post(`/api/approve-instructor/${id}`);
    setInstructors(instructors.filter(instructor => instructor._id !== id));
    alert("aproved")
  };

  return (
    <div>
      <h1>Pending Instructors</h1>
      <ul>
        {instructors?.map(instructor => (
          <li key={instructor._id}>
            {instructor.name} - {instructor.email}
            <button onClick={() => approveInstructor(instructor._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


