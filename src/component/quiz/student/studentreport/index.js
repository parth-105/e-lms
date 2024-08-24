"use client"
import React from "react";
//import PageTitle from "../../../components/PageTitle";
import { message, Modal, Table } from "antd";
//import { useDispatch } from "react-redux";
//import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReportsByUser } from "@/helpers/apicalls/reports";
import { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import useLocalStorage from "@/helpers/useLocalStorage.js";

function UserReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const [data, setData] = useLocalStorage('e-learning-user', '');

  //const dispatch = useDispatch();
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam ? record.exam.name : 'N/A'}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam? record.exam.totalMarks:"n/a"}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam? record.exam.passingMarks:"n/a"}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result?record.result.correctAnswers.length:"n/a"}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result?record.result.verdict:"n/a"}</>,
    },
  ];

  const getData = async () => {
    try {
     // dispatch(ShowLoading());
     const response = await axios.post("/api/report/get-all-reports-by-user",{ user:data._id});
     console.log('res',response)
     // const response = await getAllReportsByUser();
      if (response.data.success) {
        setReportsData(response.data.data);
      } else {
        message.error(response.data.message);
      }
    //  dispatch(HideLoading());
    } catch (error) {
    //  dispatch(HideLoading());
      message.error(error.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      
      <div className="divider"></div>
      <Table columns={columns} dataSource={reportsData} />
    </div>
  );
}

export default UserReports;
