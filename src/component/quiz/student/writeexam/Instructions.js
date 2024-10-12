import React from "react";
//import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";


function Instructions({ examData, setView, startTimer }) {
    const router = useRouter();
 // const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-col gap-1">
        <h1 className="text-2xl underline">Instructions</h1>
        <li>Exam must be completed in {examData.duration} secons.</li>
        <li>
          Exam will be submitted automatically after {examData.duration}{" "}
          seconds.
        </li>
        <li>Once submitted, you cannot change your answers.</li>
        <li>Do not refresh the page.</li>
        <li>
          You can use the <span className="font-bold"> Previous </span> and 
          <span className="font-bold"> Next </span> buttons to navigate between
          questions.
        </li>
        <li>
          Total marks of the exam is{" "}
          <span className="font-bold">{examData.totalMarks}</span>.
        </li>
        <li>
          Passing marks of the exam is{" "}
          <span className="font-bold">{examData.passingMarks}</span>.
        </li>
      </ul>

      <div className="flex gap-2">
        <Button className="transition-transform hover:scale-105"
         onClick={()=>router.push('/student')}
          variant="outline"
        >
              CLOSE
        </Button>

        <Button
          className="transition-transform hover:scale-105"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          Start Exam
        </Button>
      </div>
    </div>
  );
}

export default Instructions;
