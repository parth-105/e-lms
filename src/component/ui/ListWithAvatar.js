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
import { useEffect, useRef, useState } from "react";
import DotSpinner from "@/component/ui/loader/DotSpinner";
import { useToast } from "@/hooks/use-toast"

export function ListWithAvatar() {
  const { toast } = useToast();
  const [suggestions, setsuggestions] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);

  const listRef = useRef(null);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setVisibleCount(10); // reset count
  };

  const handleScroll = () => {
    const element = listRef.current;
    if (
      element &&
      element.scrollTop + element.clientHeight >= element.scrollHeight - 20 &&
      !loadingMore &&
      visibleCount < filteredCourses.length
    ) {
      setLoadingMore(true);
      // Mimic loading delay for smooth UX
      setTimeout(() => {
        setVisibleCount((prev) => prev + 10);
        setLoadingMore(false);
      }, 600);
    }
  };

  const filteredCourses = selectedSubject
    ? suggestions.filter((course) => course.subject === selectedSubject)
    : suggestions.filter((course) =>
      course.topic.trim().toLowerCase().includes(search.trim().toLowerCase())
    );

  const visibleSuggestions = filteredCourses.slice(0, visibleCount);

  useEffect(() => {
    const fetchCourses = async () => {
      setloading(true);
      try {
        const res = await axios.post('/api/suggestion/get-all-suggestion');
        setsuggestions(res.data.data);
        setloading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        setloading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const container = listRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [filteredCourses.length, visibleCount]);

  return (
    <Card className="w-full flex justify-center">
      <List ref={listRef} className="overflow-y-auto max-h-[500px]">
        <div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="border  rounded-l px-4 py-2  text-black border-black"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(10);
              }}
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
              <option value="Javascript">Javascript</option>
              <option value="React">React</option>
              <option value="Node">Node</option>
              <option value="MongoDB">MongoDB</option>
              <option value="GK">GK</option>
              <option value="ML">Machine Learning</option>
              <option value="ebusiness">E-business</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-3">
            <DotSpinner />
          </div>
        ) : visibleSuggestions.length > 0 ? (
          <>
            {visibleSuggestions.map((suggestion) => (
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
            ))}
            {loadingMore && (
              <div className="flex justify-center py-3">
                <DotSpinner />
              </div>
            )}
          </>
        ) : (
          <p>No suggestion available.</p>
        )}
      </List>
    </Card>
  );
}
