"use client"
import { message, Table } from "antd";
import React, { useEffect } from "react";
//import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { deleteExamById, getAllExams } from "@/helpers/apicalls/exams";
//import PageTitle from "../../../components/PageTitle";
//import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useRouter } from 'next/navigation';
import axios from "axios";
import useLocalStorage from "@/helpers/useLocalStorage.js";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


function Exams() {
    const router = useRouter();
 
  const [exams, setExams] = React.useState([]);
  const [data, setData] = useLocalStorage('e-learning-user', '');
 // const dispatch = useDispatch();

  const getExamsData = async () => {
    try {
    //  dispatch(ShowLoading());
    const response = await axios.post("/api/exam/get-all-exam-by-instructor",{instructor:data._id});   
   // const response = await axios.post("/api/exam/get-all-exam");
    //  const response = await getAllExams();
      //dispatch(HideLoading());
      if (response.data.success) {
        setExams(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
    //  dispatch(HideLoading());
      message.error(error.data.message);
    }
  };

  const deleteExam = async (examId) => {
    try {
     // dispatch(ShowLoading());
     const response = await axios.delete(
      "/api/exam/delete-exam-by-id",{
        data: { examId }
      }
    );
      // const response = await deleteExamById({
      //   examId,
      // });
    //  dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getExamsData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
    //  dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-4">
          <i
            className="ri-pencil-line cursor-pointer "
            onClick={() => router.push(`/instructor/exams/edit/${record._id}`)}
          > <Pencil className="h-4 w-4 mr-2" /></i>
          <i
            className="ri-delete-bin-line cursor-pointer"
            onClick={() => deleteExam(record._id)}
          ><Trash2 className="h-4 w-4 mr-2" /></i>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getExamsData();
  }, []);
  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        

        <Button
          
          onClick={() => router.push("/instructor/exams/add")}
        >
          <i className="ri-add-line"></i>
          Add Exam
        </Button>
      </div>
      <div className="divider"></div>

      <Table columns={columns} dataSource={exams} />
    </div>
  );
}

export default Exams;
