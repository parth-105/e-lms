"use client"
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DotSpinner from "@/component/ui/loader/DotSpinner";

export function ListWithAvatar() {


  const [suggestions, setsuggestions] = useState([]);
  const [loading, setloading] = useState(false)
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const filteredCourses = selectedSubject
  ? suggestions.filter((course) => course.subject === selectedSubject) : suggestions.filter((course) => course.topic.trim().toLowerCase().includes(search.trim().toLowerCase()))

  useEffect(() => {
    const fetchCourses = async () => {
      setloading(true)
      try {
        const res = await axios.post('/api/suggestion/get-all-suggestion');
        //  const data = await res.json();
        console.log('mcd', res.data.data)
        setsuggestions(res.data.data);
        setloading(false)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);


  return (
    <Card className="w-full flex justify-center ">
      <List>
      <div >
        <div >
          <input
            type="text"
            placeholder="Search..."
            className="border  rounded-l px-4 py-2  text-black border-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <div className="mb-8 text-center">
          <label htmlFor="subject" className="mr-2">Filter by Subject:</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">All Subjects</option>
            <option value="DSA">DSA</option>
            <option value="OS">Oprating system</option>
            <option value="Language">Languages</option>
            <option value="Ai">AI/ML</option>
            <option value="Data">Data Science</option>
            {/* Add more subjects as needed */}
          </select>
        </div>
      </div>
        {loading ? <DotSpinner/> : filteredCourses.length > 0 ? (
          filteredCourses.map((suggestion) => (
            <ListItem key={suggestion._id}>
              <ListItemPrefix>
                <Avatar variant="circular" alt="emma" src={suggestion.photoURL} />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {suggestion.author}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                 {suggestion.topic}
                </Typography>
              </div>
            </ListItem>
          ))) : (
          <p>No courses available.</p>
        )}
      </List>
    </Card>
  );
}