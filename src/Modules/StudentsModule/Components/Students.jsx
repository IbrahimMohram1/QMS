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
import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Pencil, Trash2 } from "lucide-react";
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
import useStudents from "@/Hooks/useStudent";

import img from "../../../assets/StudentImg.jpg";
import img1 from "../../../assets/StudentImg2.jpg";
import img2 from "../../../assets/StudentImg3.jpg";
import img3 from "../../../assets/StudentImg4.jpg";
import { Input } from "@/components/ui/input";
import DialogDetails from "@/Shared/DialogDetails/DialogDetails";
import Loading from "@/Shared/Loading/Loading";

export default function Students() {
  let {
    getAllStudents,
    students,
    deleteStudent,
    getStudentById,
    loading,
    studentDetails,
  } = useStudents();
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    getAllStudents();
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleViewProfile = async (id) => {
    setDialogOpen(true);
    const student = await getStudentById(id);
    setSelectedStudent(student);
  };

  const [selectedGroup, setSelectedGroup] = useState("all");
  const studentImages = [img, img1, img2, img3];

  const filtered =
    selectedGroup === "all"
      ? students
      : students.filter((student) => student.group?._id === selectedGroup);
  const searchedStudents = filtered.filter((student) =>
    `${student.first_name} ${student.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentStudents = searchedStudents.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(searchedStudents.length / itemsPerPage);

  return (
    <>
      <DeleteConfirmation
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete student"
        description={
          studentToDelete
            ? `Are you sure you want to delete ${studentToDelete.first_name} ${studentToDelete.last_name}? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (studentToDelete) {
            deleteStudent(studentToDelete._id);
          }
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
      <DialogDetails
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={"Student Details"}
      >
        {selectedStudent ? (
          <>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex gap-x-3 text-gray-600 my-2">
                <User />

                <h4 className="text-lg font-medium">Personal Information</h4>
              </div>
              <div className="flex flex-col gap-y-2">
                <p>
                  <strong>Full Name: </strong>
                  {selectedStudent.first_name} {selectedStudent.last_name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedStudent.email}
                </p>
                <p>
                  <strong>Student Id:</strong> {selectedStudent._id}
                </p>
                <p className="flex gap-x-2 items-center">
                  <ShieldCheck size={18} /> {selectedStudent.role}
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg my-4">
              <h3 className="flex items-center text-gray-700 font-semibold text-lg mb-2 gap-x-2">
                <Users size={18} />
                Group Information
              </h3>
              {selectedStudent.group ? (
                <div className="flex flex-col gap-y-2">
                  <p>
                    <strong>Group Name:</strong> {selectedStudent.group.name}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">
                  This student is not assigned to any group.
                </p>
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </DialogDetails>
      <div className="w-11/12 mx-auto border border-black/10 p-4 rounded-md my-5">
        {loading ? (
          <Loading height={"h-screen"} />
        ) : (
          <div>
            <h2 className="text-xl font-medium">Student List</h2>
            <div className="flex gap-x-4 my-4 flex-wrap">
              <Input
                className=" md:w-1/3 py-6 w-full"
                placeholder="Search By Name"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />{" "}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              {currentStudents.map((student, index) => (
                <Card
                  key={student._id}
                  id={`student-${student._id}`}
                  className="w-full py-0 rounded pr-5 h-32"
                >
                  <div className="flex items-center justify-between h-full overflow-hidden">
                    <div className="flex items-center gap-4 h-full">
                      <img
                        src={studentImages[index % studentImages.length]}
                        alt="avatar"
                        className="h-full aspect-square object-cover"
                      />

                      <div className="flex flex-col justify-center gap-y-3 ">
                        <CardTitle>
                          {student.first_name} {student.last_name}
                        </CardTitle>
                        <CardDescription className="">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <span className="font-medium text-gray-400 text-base">
                              Group:
                            </span>
                            <span className="font-semibold text-gray-500 text-base">
                              {student.group ? student.group.name : "No Group"}
                            </span>
                          </div>
                          <div
                            className={`flex items-center my-2   font-medium w-fit  py-0.5
  ${student.status === "active" ? " text-green-600" : " text-red-600"}`}
                          >
                            {student.status === "active" ? (
                              <>
                                <p className="text-base">Active</p>

                                <Check className="mx-2" size={18} />
                              </>
                            ) : (
                              <>
                                inactive
                                <CircleX size={18} />
                              </>
                            )}
                          </div>
                        </CardDescription>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="rounded-full w-8 h-8 bg-black text-white self-center">
                          <ArrowRight size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 bg-white shadow-lg border border-gray-100 rounded-xl p-1">
                        <DropdownMenuLabel className="text-xs text-gray-400 font-medium px-2">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-100" />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => handleViewProfile(student._id)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 text-sm font-medium text-gray-700"
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-100" />
                          <DropdownMenuItem
                            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-red-50 text-sm font-medium text-red-500"
                            onClick={() => {
                              setStudentToDelete(student);
                              setConfirmOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Student
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
            <div>
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Prev
              </Button>

              <span>
                {currentPage} / {totalPages}
              </span>

              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
