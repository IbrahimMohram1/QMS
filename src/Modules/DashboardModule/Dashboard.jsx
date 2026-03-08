import React from "react";
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

  return (
    <>
      <div className="w-11/12 mx-auto flex justify-center items-center mt-12 gap-x-5 ">
        <div className="md:w-1/2 w-full">
          <h2 className="font-semibold text-lg">Upcoming 5 quizzes</h2>
          <div className="flex flex-col gap-y-2 my-3">
            {currentStudents.map((student, index) => (
              <Card
                key={student._id}
                id={`student-${student._id}`}
                className="w-full  rounded-lg px-5 py-2  border border-gray-400 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between h-full   ">
                  <div className="flex items-center gap-4 ">
                    <div className="flex flex-col justify-center gap-y-2  ">
                      <CardTitle className="mt-2">
                        Quiz 1: Introduction to React
                      </CardTitle>
                      <CardDescription className="">
                        <div className="flex  flex-col  text-sm text-gray-500 gap-y-1">
                          <span className="flex gap-x-2  ">
                            <CalendarDays size={16} />{" "}
                            <span className="font-semibold"> Scheduled :</span>{" "}
                            Thursday, February 15, 2024 at 11:19 PM
                          </span>
                          <span className="flex gap-x-2  ">
                            <Lock size={16} />{" "}
                            <span className="font-semibold"> Code:</span>{" "}
                            065MLXX
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex justify-start items-start">
                    <ArrowRight size={22} className="text-gray-400" />
                  </div>
                </div>

                <div></div>
              </Card>
            ))}
            <div className="mt-3">
              <Link className="flex gap-x-2 items-center text-green-500 ">
                <span className="text-base  ">View Quiz directory</span>
                <MoveRight />
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full border border-black/10 p-3 rounded-lg bg-gray-50 ">
          <div className="flex justify-between items-center p-4">
            <h2 className="font-semibold text-lg">Top 5 Students</h2>
            <Link className="font-medium flex items-center">
              All Students
              <ArrowRight size={18} className="text-green-500" />
            </Link>
          </div>
          <div className="flex flex-col gap-y-3">
            {currentStudents.map((student, index) => (
              <Card
                key={student._id}
                id={`student-${student._id}`}
                className="w-full  rounded-lg px-5 py-2 h-20 border border-gray-400 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between h-full   ">
                  <div className="flex items-center gap-4 h-full">
                    <img
                      src={studentImages[index % studentImages.length]}
                      alt="avatar"
                      className="h-full aspect-square object-cover rounded-full"
                    />

                    <div className="flex flex-col justify-center gap-y-2  ">
                      <CardTitle className="mt-2">
                        {student.first_name} {student.last_name}
                      </CardTitle>
                      <CardDescription className="">
                        <div className="flex items-center  text-sm text-gray-500">
                          <span className="">
                            Class rank: grouup | Average score: 20%
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <div>
                    <ArrowRight size={22} className="text-gray-400" />
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
