"use client"
import { message } from "antd";
import React, { useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "@/helpers/apicalls/exams";
import { addReport } from "@/helpers/apicalls/reports";
//import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import Instructions from "@/component/quiz/student/writeexam/Instructions";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from "axios";


function page() {
    const router = useRouter();
  const [examData, setExamData] = React.useState(null);
  const [questions = [], setQuestions] = React.useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState({});
  const [result = {}, setResult] = React.useState({});
  const params = useParams();
  const { id } = params;

 // const params = useParams();
  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  const [view, setView] = useState("instructions");
  const [secondsLeft = 0, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
//  const { user } = useSelector((state) => state.users);
  const getExamData = async () => {
    try {
     // dispatch(ShowLoading());

     const response = await axios.post(
      "/api/exam/get-exam-by-id",
      {examId: params.id}
    );

    console.log("res",response)
      // const response = await getExamById({
      //   examId: params.id,
      // });
    //  dispatch(HideLoading());
      if (response.data.success) {
        console.log("question",response.data)
        setQuestions(response.data.data.questions);
        setExamData(response.data.data);
        setSecondsLeft(response.data.duration);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
    //  dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculateResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = "Pass";
      if (correctAnswers.length < examData.passingMarks) {
        verdict = "Fail";
      }

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };
      setResult(tempResult);
    //  dispatch(ShowLoading());
    const response = await axios.post("/api/report/add-report",
      { exam: params.id,
      result: tempResult,
      user: '66bf6d68f1cc39527b8403f4'});

      // const response = await addReport({
      //   exam: params.id,
      //   result: tempResult,
      //   user: user._id,
      // });
    //  dispatch(HideLoading());
      if (response.data.success) {
        setView("result");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
    
      message.error(error.data.message);
    }
  };

  const startTimer = () => {
    let totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);
  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center">{examData.name}</h1>
        <div className="divider"></div>

        {view === "instructions" && (
          <Instructions
            examData={examData}
            setView={setView}
            startTimer={startTimer}
          />
        )}

        {view === "questions" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-2xl">
                {selectedQuestionIndex + 1} :{" "}
                {questions[selectedQuestionIndex]?.name ?? 'No question available'}
              </h1>

              <div className="timer">
                <span className="text-2xl">{secondsLeft}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {Object.keys(questions[selectedQuestionIndex]?.options ?? {}).map(
                (option, index) => {
                  return (
                    <div
                      className={`flex gap-2 flex-col ${
                        selectedOptions[selectedQuestionIndex] === option
                          ? "bg-red-500"
                          : "option"
                      }`}
                      key={index}
                      onClick={() => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedQuestionIndex]: option,
                        });
                      }}
                    >
                      <h1 className="text-xl">
                        {option} :{" "}
                        {questions[selectedQuestionIndex].options[option]}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>

            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}

              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}

              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                  //  clearInterval(intervalId);
                  //  setTimeUp(true);
                  calculateResult();
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {view === "result" && (
          <div className="flex  items-center mt-2 justify-center result text-black">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl text-black font-bold ">RESULT</h1>
               <div className="divider"></div>
              <div className="text-black font-bold">
                <h1 className="text-md">Total Marks : {examData.totalMarks}</h1>
                <h1 className="text-md">
                  Obtained Marks :{result.correctAnswers.length}
                </h1>
                <h1 className="text-md">
                  Wrong Answers : {result.wrongAnswers.length}
                </h1>
                <h1 className="text-md">
                  Passing Marks : {examData.passingMarks}
                </h1>
                <h1 className="text-md">VERDICT :{result.verdict}</h1>

                <div className="flex gap-2 mt-2">
                  <button
                    className="primary-outlined-btn"
                    onClick={() => {
                      setView("instructions");
                      setSelectedQuestionIndex(0);
                      setSelectedOptions({});
                      setSecondsLeft(examData.duration);
                    }}
                  >
                    Retake Exam
                  </button>
                  <button
                    className="primary-contained-btn"
                    onClick={() => {
                      setView("review");
                    }}
                  >
                    Review Answers
                  </button>
                </div>
              </div>
            </div>
            <div className="lottie-animation text-black">
              {result.verdict === "Pass" && (
              <p className="bg-green-700 text-5xl">pass</p>
              )}

              {result.verdict === "Fail" && (
                <h1>fail</h1>
              )}
            </div>
          </div>
        )}

        {view === "review" && (
          <div className="flex flex-col gap-2">
            {questions.map((question, index) => {
              const isCorrect =
                question.correctOption === selectedOptions[index];
              return (
                <div
                  className={`
                  flex flex-col gap-1 p-2 ${
                    isCorrect ? "bg-success" : "bg-error"
                  }
                `}
                >
                  <h1 className="text-xl">
                    {index + 1} : {question.name}
                  </h1>
                  <h1 className="text-md">
                    Submitted Answer : {selectedOptions[index]} -{" "}
                    {question.options[selectedOptions[index]]}
                  </h1>
                  <h1 className="text-md">
                    Correct Answer : {question.correctOption} -{" "}
                    {question.options[question.correctOption]}
                  </h1>
                </div>
              );
            })}

            <div className="flex justify-center gap-2">
              <button
                className="primary-outlined-btn"
                onClick={() => {
                    router.push("/");
                }}
              >
                Close
              </button>
              <button
                className="primary-contained-btn"
                onClick={() => {
                  setView("instructions");
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                  setSecondsLeft(examData.duration);
                }}
              >
                Retake Exam
              </button>
            </div>
          </div>
        )}
      </div> 
    )
  );
}

export default page;