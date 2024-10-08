"use client"
import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "@/helpers/apicalls/exams";
//import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
//import PageTitle from "../../../components/PageTitle";
//import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/navigation';
import axios from "axios";
import ExamCard from "@/component/ui/exam/ExamCard";

function Home() {
  const router = useRouter();
  const [exams, setExams] = React.useState([]);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  //const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      //   dispatch(ShowLoading());
      const response = await axios.post("/api/exam/get-all-exam");
      console.log("all-exam", response.data)
      if (response.data.success) {
        setExams(response.data.data);
      } else {
        console.error(response.data.message);
        message.error(response.message);
      }
      //   dispatch(HideLoading());
    } catch (error) {
      // dispatch(HideLoading());
      console.log(error.data.message);
      message.error(error.data.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    (
      <div className="flex h-screen" >

        {/* <Row gutter={[3, 3]} className="" >
          {exams.map((exam) => (
            
            <Col key={exam._id} span={8} className="container w-4/5 mx-auto p-4" >
              <div className="card-lg flex flex-col gap-1 p-1">
                <h1 className="text-2xl">{exam?.name}</h1>

                <h1 className="text-md">Category : {exam.category}</h1>

                <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
                <h1 className="text-md">Duration : {exam.duration}</h1>

                <button
                  className="primary-outlined-btn"
                  onClick={() => router.push(`/student/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row> */}

        <div className='flex flex-wrap justify-center'>
          {exams.map((exam, index) =>
          (
            <div key={index} className='m-4' >
              <ExamCard exam={exam} />
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Home;
