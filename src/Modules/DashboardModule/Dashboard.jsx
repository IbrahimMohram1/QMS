import React, { useContext, useEffect, useState } from "react";
import img from "../../assets/StudentImg.jpg";
import img1 from "../../assets/StudentImg2.jpg";
import img2 from "../../assets/StudentImg3.jpg";
import img3 from "../../assets/StudentImg4.jpg";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Eye,
  Lock,
  MoveRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  CircleCheck,
  CircleX,
  Plus,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteConfirmation from "@/Shared/DeleteConfirmation/DeleteConfirmation";
import { Link } from "react-router-dom";
import useQuizes from "@/Hooks/useQuizes";
import Loading from "@/Shared/Loading/Loading";
import { AuthContext } from "@/Context/AuthContext";
export default function Dashboard() {
  const studentImages = [img, img1, img2, img3];
  const currentStudents = [
    {
      _id: "64b8c9e5f1a2c9b1d2e3f4a",
      first_name: "John",
      last_name: "Doe",
    },
    {
      _id: "64b8c9e5f1a2c9b1d2e3f4b",
      first_name: "Jane",
      last_name: "Smith",
    },
  ];
  let { getIncommingQuizes, getCompletedQuizes } = useQuizes();
  const [incomingQuizes, setIncomingQuizes] = useState([]);
  const [completedQuizes, setCompletedQuizes] = useState([]);
  const [loadingQuizes, setLoadingQuizes] = useState(false);

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
  const allQuizzes = [...incomingQuizes, ...completedQuizes].slice(0, 5);

  useEffect(() => {
    fetchQuizes();
  }, []);
  return (
    <>
      <div className="w-11/12 mx-auto flex justify-center items-start mt-8 gap-x-5 flex-wrap gap-y-5 md:flex-nowrap ">
        <div className="md:w-1/2 w-full border border-black/10 dark:border-gray-700 p-5 rounded-lg bg-gray-50 dark:bg-gray-900 ">
          <h2 className="font-semibold text-base text-black dark:text-gray-100 my-3">
            Upcoming 5 quizzes
          </h2>

          {loadingQuizes ? (
            <div>
              <Loading />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-y-2 ">
                {allQuizzes.map((quiz, index) => (
                  <Link key={quiz._id} to={`/dashboard/quizes/${quiz._id}`}>
                    <Card
                      id={`student-${quiz._id}`}
                      className="w-full  rounded-lg px-5 py-0  border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between     ">
                        <div className="flex items-center gap-y-4 ">
                          <div className="flex flex-col justify-center gap-y-1  ">
                            <CardTitle className="mt-2 dark:text-white text-[14px]">
                              {quiz.title}
                            </CardTitle>
                            <CardDescription className="">
                              <div className="flex  flex-col  text-sm text-gray-500 dark:text-gray-400 gap-y-1">
                                <span className="flex gap-x-2  ">
                                  <CalendarDays size={14} />{" "}
                                  <span className="font-semibold">
                                    {" "}
                                    Scheduled :
                                  </span>{" "}
                                  {quiz.schadule}
                                </span>
                                <span className="flex gap-x-2  ">
                                  <Lock size={16} />{" "}
                                  <span className="font-semibold"> Code:</span>{" "}
                                  {quiz.code}
                                </span>
                              </div>
                            </CardDescription>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 text-base font-semibold rounded-full ${
                            quiz.status === "open"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {quiz.status}
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
                <div className="mt-3">
                  <Link
                    to={"/dashboard/quizes"}
                    className="flex gap-x-2 items-center text-green-500 "
                  >
                    <span className="text-base  ">View Quiz directory</span>
                    <MoveRight />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="md:w-1/2 w-full border border-black/10 dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 ">
          <div className="flex justify-between items-center p-4">
            <h2 className="font-semibold text-lg text-black dark:text-gray-100">
              Top 5 Students
            </h2>
            <Link className="font-medium flex items-center text-black dark:text-gray-100">
              All Students
              <ArrowRight size={18} className="text-green-500" />
            </Link>
          </div>
          <div className="flex flex-col gap-y-3">
            {currentStudents.map((student, index) => (
              <Card
                key={student._id}
                id={`student-${student._id}`}
                className="w-full  rounded-lg px-5 py-2 h-20 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between h-full   ">
                  <div className="flex items-center gap-4 h-full">
                    <img
                      src={studentImages[index % studentImages.length]}
                      alt="avatar"
                      className="h-full aspect-square object-cover rounded-full"
                    />

                    <div className="flex flex-col justify-center gap-y-2  ">
                      <CardTitle className="mt-2 dark:text-white">
                        {student.first_name} {student.last_name}
                      </CardTitle>
                      <CardDescription className="">
                        <div className="flex items-center  text-sm text-gray-500 dark:text-gray-400">
                          <span className="">
                            Class rank: grouup | Average score: 20%
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <div>
                    <ArrowRight
                      size={22}
                      className="text-gray-400 dark:text-gray-300"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
