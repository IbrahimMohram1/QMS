import axiosClient from "@/Api/AxiosClient";
import useQuizes from "@/Hooks/useQuizes";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StudentQuiz() {
  const { state } = useLocation();
  const quizId = state?.quizId;
  const questions = state?.questions;
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log(quizId);
  });
  const handleSubmit = async () => {
    // بنحول الـ selected object للـ format المطلوب
    const answers = Object.entries(selected).map(([questionId, answer]) => ({
      question: questionId,
      answer: answer,
    }));

    console.log({ answers });

    try {
      const response = await axiosClient.post(`/api/quiz/submit/${quizId}`, {
        answers,
      });
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!questions) return <p>Loading questions...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      {questions.map((question) => (
        <div key={question._id} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            {question.title}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(question.options)
              .filter(([key]) => key !== "_id")
              .map(([key, value]) => (
                <div
                  key={key}
                  onClick={() =>
                    setSelected((prev) => ({ ...prev, [question._id]: key }))
                  }
                  className={`
                    cursor-pointer rounded-xl border-2 p-4 flex items-center gap-3
                    transition-all duration-200
                    ${
                      selected[question._id] === key
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white hover:border-green-300 hover:bg-gray-50"
                    }
                  `}
                >
                  <span
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center 
                    text-sm font-bold shrink-0
                    ${
                      selected[question._id] === key
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                  >
                    {key}
                  </span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={Object.keys(selected).length !== questions.length}
        className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold
          hover:bg-green-600 transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Submit Answers
      </button>
    </div>
  );
}
