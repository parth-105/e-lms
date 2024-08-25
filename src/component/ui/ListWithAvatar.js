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

export function ListWithAvatar() {


  const [suggestions, setsuggestions] = useState([]);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.post('/api/suggestion/get-all-suggestion');
        //  const data = await res.json();
        console.log('mcd', res.data.data)
        setsuggestions(res.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);


  return (
    <Card className="w-96">
      <List>

        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <ListItem>
              <ListItemPrefix>
                <Avatar variant="circular" alt="emma" src="https://docs.material-tailwind.com/img/face-3.jpg" />
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