import React, { useState, useEffect, useContext } from "react";
import {
  AlarmClockPlus,
  Vault,
  ArrowRightCircle,
  Check,
  X,
  Calendar,
  Clock,
  Copy,
  CheckCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import useGroup from "@/Hooks/useGroup";
import useQuizes from "@/Hooks/useQuizes";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import InComingImg from "@/assets/InComeingQuiz.png";
import { AuthContext } from "@/Context/AuthContext";

export default function Quizes() {
  const navigate = useNavigate();
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const { groups, getAllGroups } = useGroup();
  const { createQuiz, getIncommingQuizes, getCompletedQuizes } = useQuizes();
  const [incomingQuizes, setIncomingQuizes] = useState([]);
  const [completedQuizes, setCompletedQuizes] = useState([]);
  const [loadingQuizes, setLoadingQuizes] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [quizCode, setQuizCode] = useState("");
  const [copied, setCopied] = useState(false);
  let { loginData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      group: "",
      questions_number: 10,
      difficulty: "medium",
      type: "FE",
      schadule: new Date().toISOString().slice(0, 16),
      duration: 30,
      score_per_question: 1,
    },
  });

  const fetchQuizes = async () => {
    setLoadingQuizes(true);
    try {
      const incoming = await getIncommingQuizes();
      setIncomingQuizes(incoming?.data || incoming || []);

      const completed = await getCompletedQuizes();
      setCompletedQuizes(completed?.data || completed || []);
    } catch (error) {
      console.error("Error fetching quizes", error);
    } finally {
      setLoadingQuizes(false);
    }
  };

  useEffect(() => {
    getAllGroups();
    fetchQuizes();
  }, []);

  const onQuizSubmit = async (data) => {
    const formattedData = {
      title: data.title,
      description: data.description,
      group: data.group,
      questions_number: Number(data.questions_number),
      difficulty: data.difficulty,
      type: data.type,
      schadule: data.schadule ? new Date(data.schadule).toISOString() : "",
      duration: String(data.duration),
      score_per_question: String(data.score_per_question),
    };
    try {
      const response = await createQuiz(formattedData);
      console.log("Quiz Response:", response);
      // Refresh lists simply
      fetchQuizes();
      const code = response?.data?.code || response?.code || "";
      setQuizCode(code);
      setSuccessModal(true);
      setOpenQuizDialog(false);
      reset();
    } catch (err) {
      console.error("Failed to create quiz:", err);
    }
  };

  const handleCopyCode = () => {
    if (!quizCode) return;
    navigator.clipboard.writeText(quizCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  function QuizCard({ title, onClick }) {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-[10px] border border-black/20 p-6 flex flex-col items-center justify-center gap-5 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 group shadow-sm w-full min-h-[200px] sm:min-h-[240px]"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-black/10 group-hover:border-black/30 transition-all">
          <AlarmClockPlus className="h-10 w-10 text-black group-hover:scale-110 transition-transform duration-300" />
        </div>

        <span className="text-base font-extrabold text-black text-center leading-snug tracking-tight">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className="py-6 px-6 font-sans min-h-screen">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
        {/* Left Section: Two cards responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 content-start">
          {/* Set up a new quiz card */}
          <QuizCard
            title={
              loginData.role === "Instructor"
                ? "Set up a new quiz"
                : "Join Quiz"
            }
            onClick={
              loginData.role === "Instructor"
                ? () => setOpenQuizDialog(true)
                : () => setSuccessModal(true)
            }
          />

          {/* Question Bank card */}
          <div
            onClick={() => navigate("/dashboard/questions")}
            className="bg-white rounded-[10px] border border-black/20 p-6 flex flex-col items-center justify-center gap-5 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 group shadow-sm w-full min-h-[200px] sm:min-h-[240px]"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-[18px] border-2 border-dashed border-black/10 group-hover:border-black/30 transition-all">
              <Vault className="h-10 w-10 text-black group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-base font-extrabold text-black text-center leading-snug tracking-tight">
              Question Bank
            </span>
          </div>
        </div>

        {/* Right Section: Quizzes Overview */}
        <div className="flex flex-col gap-6 w-full">
          {/* Upcoming Quizzes */}
          <div className="bg-white rounded-[10px] border border-black/20 p-6 lg:p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-black mb-8 lg:mb-10 tracking-tight">
              Upcoming quizzes
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              {loadingQuizes ? (
                <div className="flex items-center justify-center py-10">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/10 border-t-black" />
                </div>
              ) : incomingQuizes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-black/30">
                  <img src={InComingImg} alt="InComingImg" />
                  <p className="font-bold text-lg">No upcoming quizzes</p>
                </div>
              ) : (
                incomingQuizes.map((quiz) => {
                  const scheduleDate = quiz.schadule
                    ? new Date(quiz.schadule)
                    : null;
                  const dateStr = scheduleDate
                    ? scheduleDate
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, " / ")
                    : "—";
                  const timeStr = scheduleDate
                    ? scheduleDate.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—";

                  return (
                    <div
                      key={quiz._id}
                      onClick={() => navigate(`/dashboard/quizes/${quiz._id}`)}
                      className="flex flex-col md:flex-row items-stretch rounded-[10px] border border-black/20 hover:shadow-md transition-all cursor-pointer bg-white group overflow-hidden"
                    >
                      {/* Left: Image Container */}
                      <div className="w-full md:w-[110px] h-[80px] md:h-auto bg-[#FFEDDF] shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={InComingImg}
                          alt="Quiz Graphic"
                          className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Right: Content Container */}
                      <div className="flex flex-col w-full flex-1 justify-between p-2 md:px-3 md:py-2">
                        <div>
                          <h3 className="text-[14px] font-extrabold text-black mb-0.5 leading-tight tracking-tight line-clamp-1 group-hover:text-[#CDD400] transition-colors">
                            {quiz.title}
                          </h3>
                          <div className="text-[11px] text-black/60 font-bold">
                            <span>{dateStr}</span>{" "}
                            <span className="mx-1.5">|</span>{" "}
                            <span>{timeStr}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1">
                          <span className="text-[11px] font-extrabold text-black/80 tracking-tight">
                            No. of student's enrolled: {quiz.participants || 32}
                          </span>
                          <div className="flex items-center gap-1 text-[12px] font-extrabold text-black">
                            Open
                            <ArrowRightCircle className="h-[14px] w-[14px] text-[#CDD400]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Completed Quizzes */}
          <div className="bg-white rounded-[10px] border border-black/20 p-6 lg:p-8 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[18px] lg:text-xl font-extrabold text-black tracking-tight">
                Completed Quizzes
              </h2>
              <button
                onClick={() => navigate("/dashboard/results")}
                className="text-[13px] font-extrabold text-black/40 hover:text-black transition-colors flex items-center gap-1 group"
              >
                Results
                <ArrowRightCircle className="h-[14px] w-[14px] text-[#CDD400] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#000000] text-white">
                    <th className="py-3 px-4 font-bold text-[12px] border-r border-white/20">
                      Title
                    </th>
                    <th className="py-3 px-4 font-bold text-[12px] border-r border-white/20">
                      Group name
                    </th>
                    <th className="py-3 px-4 font-bold text-[12px] border-r border-white/20">
                      No. of persons in group
                    </th>
                    <th className="py-3 px-4 font-bold text-[12px]">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {completedQuizes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-10 text-center font-bold text-[13px] text-black/30 border border-black/10"
                      >
                        No completed quizzes yet
                      </td>
                    </tr>
                  ) : (
                    completedQuizes.map((row) => {
                      const dateStr = row.schadule
                        ? new Date(row.schadule)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, " / ")
                        : "—";
                      return (
                        <tr
                          key={row._id}
                          onClick={() =>
                            navigate(`/dashboard/quizes/${row._id}`)
                          }
                          className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                        >
                          <td className="py-4 px-4 font-bold text-[13px] text-black group-hover:text-[#E37A49] border border-black/10 border-t-0">
                            {row.title}
                          </td>
                          <td className="py-4 px-4 font-bold text-[13px] text-black/60 border border-black/10 border-t-0 border-l-0">
                            {row.group || "—"}
                          </td>
                          <td className="py-4 px-4 font-bold text-[13px] text-black/60 border border-black/10 border-t-0 border-l-0">
                            {row.participants ?? "—"} persons
                          </td>
                          <td className="py-4 px-4 font-bold text-[13px] text-black/60 border border-black/10 border-t-0 border-l-0">
                            {dateStr}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ================ Set up a new quiz Modal ================ */}
      <Dialog
        open={openQuizDialog}
        onOpenChange={(open) => {
          setOpenQuizDialog(open);
          if (!open) reset();
        }}
      >
        <DialogContent className="max-w-5xl! w-[95vw]! p-0 overflow-hidden border border-black/15 rounded-[12px] bg-white shadow-2xl [&>button]:hidden">
          <form onSubmit={handleSubmit(onQuizSubmit)}>
            {/* Header */}
            <div className="flex justify-between items-center px-8 border-b border-black/10 min-h-[70px] bg-white">
              <DialogTitle className="text-xl font-bold text-black font-sans">
                Set up a new quiz
              </DialogTitle>
              <div className="flex border-l border-black/10 h-[70px] items-center">
                <button
                  type="submit"
                  className="px-8 h-full hover:bg-gray-50 transition-colors cursor-pointer border-r border-black/10 flex items-center justify-center"
                >
                  <Check size={26} strokeWidth={2.5} className="text-black" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenQuizDialog(false)}
                  className="px-8 h-full hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <X size={26} strokeWidth={2.5} className="text-black" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-4">
              <p className="font-semibold text-black/70 text-sm mb-2">
                Details
              </p>

              {/* Title */}
              <div className="flex items-center border border-[#0000004D] rounded-[10px] overflow-hidden h-12 bg-white">
                <span className="bg-[#FFEDDF] px-5 h-full flex items-center font-bold text-black text-sm border-r border-[#0000004D] shrink-0 whitespace-nowrap">
                  Title:
                </span>
                <Input
                  {...register("title", { required: true })}
                  className="flex-1 h-full border-none shadow-none text-black font-bold text-sm bg-transparent placeholder:text-gray-300 rounded-none focus-visible:ring-0"
                  placeholder="Enter quiz title..."
                />
              </div>

              {/* Duration | No. of questions | Score per question */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center border border-[#0000004D] rounded-[10px] overflow-hidden h-12 bg-white">
                  <span className="bg-[#FFEDDF] px-4 h-full flex items-center font-bold text-black text-sm border-r border-[#0000004D] shrink-0 whitespace-nowrap">
                    Duration{" "}
                    <span className="text-[11px] text-black/40 ml-1">
                      (min)
                    </span>
                  </span>
                  <select
                    {...register("duration")}
                    className="flex-1 px-3 h-full border-none bg-transparent text-black font-bold text-sm outline-none cursor-pointer"
                  >
                    {[10, 15, 20, 30, 45, 60, 90, 120, 180].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center border border-[#0000004D] rounded-[10px] overflow-hidden h-12 bg-white">
                  <span className="bg-[#FFEDDF] px-4 h-full flex items-center font-bold text-black text-sm border-r border-[#0000004D] shrink-0 whitespace-nowrap">
                    No. of questions
                  </span>
                  <select
                    {...register("questions_number")}
                    className="flex-1 px-3 h-full border-none bg-transparent text-black font-bold text-sm outline-none cursor-pointer"
                  >
                    {[1, 5, 10, 15, 20, 25, 30, 40, 50].map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center border border-[#0000004D] rounded-[10px] overflow-hidden h-12 bg-white">
                  <span className="bg-[#FFEDDF] px-4 h-full flex items-center font-bold text-black text-sm border-r border-[#0000004D] shrink-0 whitespace-nowrap">
                    Score per question
                  </span>
                  <select
                    {...register("score_per_question")}
                    className="flex-1 px-3 h-full border-none bg-transparent text-black font-bold text-sm outline-none cursor-pointer"
                  >
                    {[1, 2, 5, 10, 20].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="flex border border-[#0000004D] rounded-[10px] overflow-hidden bg-white">
                <span className="bg-[#FFEDDF] px-5 self-stretch flex items-start pt-4 font-bold text-black text-sm border-r border-[#0000004D] shrink-0 whitespace-nowrap">
                  Description
                </span>
                <Textarea
                  {...register("description")}
                  rows={4}
                  className="flex-1 px-5 py-3 border-none shadow-none text-black text-sm bg-transparent resize-none placeholder:text-gray-300 leading-relaxed rounded-none focus-visible:ring-0"
                  placeholder="Provide details about this quiz..."
                />
              </div>

              {/* Schedule */}
              <div className="flex items-center border border-[#0000004D] rounded-[10px] overflow-hidden h-12 bg-white">
                <span className="bg-[#FFEDDF] px-5 h-full flex items-center font-bold text-black text-sm border-r border-[#0000004D] shrink-0 whitespace-nowrap">
                  Schedule
                </span>
                <div className="flex-1 flex items-center px-4 gap-3">
                  <Calendar className="h-4 w-4 text-black/50 shrink-0" />
                  <input
                    type="datetime-local"
                    {...register("schadule", { required: true })}
                    className="flex-1 bg-transparent border-none outline-none text-black font-bold text-sm cursor-pointer"
                  />
                </div>
              </div>

              {/* Difficulty | Category | Group */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center border border-[#0000004D] rounded-[10px] overflow-hidden h-12 bg-white">
                  <span className="bg-[#FFEDDF] px-4 h-full flex items-center font-bold text-black text-sm border-r border-[#0000004D] shrink-0 whitespace-nowrap">
                    Difficulty level
                  </span>
                  <select
                    {...register("difficulty")}
                    className="flex-1 px-3 h-full border-none bg-transparent text-black font-bold text-sm outline-none cursor-pointer"
                  >
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                  </select>
                </div>

                <div className="flex items-center border border-[#0000004D] rounded-[10px] overflow-hidden h-12 bg-white">
                  <span className="bg-[#FFEDDF] px-4 h-full flex items-center font-bold text-black text-sm border-r border-[#0000004D] shrink-0 whitespace-nowrap">
                    Category type
                  </span>
                  <select
                    {...register("type")}
                    className="flex-1 px-3 h-full border-none bg-transparent text-black font-bold text-sm outline-none cursor-pointer"
                  >
                    <option value="FE">FE</option>
                    <option value="BE">BE</option>
                    <option value="DO">DO</option>
                  </select>
                </div>

                <div className="flex items-center border border-[#0000004D] rounded-[10px] overflow-hidden h-12 bg-white">
                  <span className="bg-[#FFEDDF] px-4 h-full flex items-center font-bold text-black text-sm border-r border-[#0000004D] shrink-0 whitespace-nowrap">
                    Group name
                  </span>
                  <select
                    {...register("group", { required: true })}
                    className="flex-1 px-3 h-full border-none bg-transparent text-black font-bold text-sm outline-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Group
                    </option>
                    {groups?.map((g) => (
                      <option key={g._id} value={g._id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================ Success Modal ================ */}
      <Dialog
        open={successModal}
        onOpenChange={(open) => {
          setSuccessModal(open);
        }}
      >
        <DialogContent className="max-w-sm! w-[90vw]! p-0 overflow-hidden border-none rounded-[20px] bg-white shadow-2xl [&>button]:hidden">
          <div className="flex flex-col items-center gap-6 px-10 py-12">
            {/* Checkmark icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0D1321]">
              <Check size={40} strokeWidth={3} className="text-white" />
            </div>

            {/* Title */}
            <p className="text-xl font-extrabold text-black text-center tracking-tight">
              {loginData.role === "Instructor"
                ? "  Quiz was successfully created"
                : "Join Quiz"}
            </p>

            {/* Code display */}
            {loginData.role == "Instructor" ? (
              <div className="flex items-center gap-0 rounded-full border-2 border-black/10 overflow-hidden w-full max-w-xs">
                <span className="bg-[#F5F5F5] px-5 py-3 font-extrabold text-black text-sm tracking-widest border-r border-black/10 shrink-0">
                  CODE:
                </span>
                <span className="flex-1 px-5 py-3 font-extrabold text-black text-lg tracking-widest text-center">
                  {quizCode || "—"}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors shrink-0 border-l border-black/10"
                  title="Copy code"
                >
                  {copied ? (
                    <CheckCheck size={18} className="text-green-600" />
                  ) : (
                    <Copy size={18} className="text-black/50" />
                  )}
                </button>
              </div>
            ) : (
              <Input
                className="p-3"
                type="text"
                placeholder="Enter Your Code to join "
              />
            )}

            {/* Close button */}
            {loginData.role == "Instructor" ? (
              <button
                onClick={() => {
                  setSuccessModal(false);
                }}
                className="w-full max-w-xs rounded-full bg-[#CDD400] hover:bg-[#b8bf00] text-black font-extrabold py-4 text-base transition-all active:scale-95 shadow-md"
              >
                Close
              </button>
            ) : (
              <button className="w-full max-w-xs rounded-full bg-[#CDD400] hover:bg-[#b8bf00] text-black font-extrabold py-4 text-base transition-all active:scale-95 shadow-md">
                Send
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
