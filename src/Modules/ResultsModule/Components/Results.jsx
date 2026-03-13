import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthContext } from "@/Context/AuthContext";
import useResults from "@/Hooks/useResults";
import Loading from "@/Shared/Loading/Loading";
import { Eye, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const { getAllResults, loading, results } = useResults();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let { loginData } = useContext(AuthContext);
  const itemsPerPage = 10;

  const filtered = results.filter((result) =>
    result.quiz.title.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedResults = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    getAllResults();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <>
      <div className=" dark:bg-gray-900">
        <div className="w-full mx-auto py-5">
          <div className="flex justify-between items-center ">
            <h1 className="text-2xl font-bold text-black dark:text-gray-100">
              Closed Quizzes
            </h1>

            <div className="relative md:w-1/3 w-full ">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                size={20}
              />

              <Input
                className="w-full py-6 pl-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder:text-black dark:placeholder:text-gray-400 placeholder:text-base text-black dark:text-white"
                placeholder="Search By Name"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="border border-gray-300 dark:border-gray-700 p-5 rounded-lg mt-5 bg-white dark:bg-gray-800">
            <Table className="border border-gray-200 dark:border-gray-600 p-5 rounded-lg ">
              <TableHeader className="bg-[#0D1321] rounded-full text-center ">
                <TableRow className="hover:bg-transparent border-none text-center">
                  <TableHead className="text-white text-center font-semibold uppercase py-4 px-6 text-[14px]  border-r border-gray-800 last:border-r-0">
                    TITLE
                  </TableHead>
                  <TableHead className="text-white text-center font-semibold uppercase py-4 px-6 text-[14px]  border-r border-gray-800 last:border-r-0">
                    Status
                  </TableHead>
                  <TableHead className="text-white text-center font-semibold uppercase py-4 px-6 text-[14px]  border-r border-gray-800 last:border-r-0 ">
                    Code
                  </TableHead>
                  <TableHead className="text-white font-semibold uppercase py-4 px-6 text-[14px]  border-r border-gray-800 last:border-r-0 text-center">
                    Duration
                  </TableHead>
                  <TableHead className="text-white font-semibold uppercase py-4 px-6 text-[14px]  border-r border-gray-800 last:border-r-0 text-center">
                    Schedule
                  </TableHead>
                  <TableHead className="text-white font-semibold uppercase py-4 px-6 text-[14px]  border-r border-gray-800 last:border-r-0 text-center">
                    Difficulty
                  </TableHead>
                  <TableHead className="text-white font-semibold uppercase py-4 px-6 text-[14px]  text-center">
                    ACTIONS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Loading />
                    </TableCell>
                  </TableRow>
                ) : paginatedResults.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-xl text-gray-400 font-mono"
                    >
                      No closed quizzes found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedResults.map((result) => (
                    <TableRow
                      className={`text-center py-5 ${loginData?.role === "Instructor" ? "cursor-pointer" : ""} hover:bg-gray-50 dark:hover:bg-gray-700`}
                      key={result.quiz._id}
                      onClick={() => {
                        if (loginData?.role === "Instructor") {
                          navigate(`/dashboard/quiz-result-view`, {
                            state: {
                              quiz: result.quiz,
                              participants: result.participants,
                            },
                          });
                        }
                      }}
                    >
                      <TableCell className="font-medium  py-5 text-black dark:text-gray-100">
                        {result.quiz.title}
                      </TableCell>
                      <TableCell className="text-black dark:text-gray-100">
                        {result.quiz.status}
                      </TableCell>
                      <TableCell className="text-black dark:text-gray-100">
                        {result.quiz.code}
                      </TableCell>
                      <TableCell className="text-center  text-black dark:text-gray-100">
                        {result.quiz.duration} MIN
                      </TableCell>
                      <TableCell className="text-center  text-black dark:text-gray-100">
                        {new Date(result.quiz.schadule).toLocaleString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          },
                        )}
                      </TableCell>
                      <TableCell className="text-center  px-4 py-5 text-black dark:text-gray-100">
                        {result.quiz.difficulty}
                      </TableCell>
                      <TableCell className="mx-auto flex px-4 py-3 text-center justify-center items-center gap-x-2 text-md cursor-pointer text-black dark:text-gray-100">
                        <Eye
                          size={28}
                          className="cursor-pointer text-green-500 dark:text-green-400"
                        />
                        View
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="flex  items-center gap-4 mt-4">
              <Button
                className="text-xs text-gray-600 dark:text-white"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </Button>

              <span className="text-sm text-gray-600 dark:text-white">
                {currentPage} / {totalPages}
              </span>

              <Button
                className="text-xs text-gray-600 dark:text-white"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
