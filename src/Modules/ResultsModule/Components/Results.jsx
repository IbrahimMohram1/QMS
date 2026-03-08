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
import useResults from "@/Hooks/useResults";
import { Eye, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Results() {
  const { getAllResults, loading, results } = useResults();
  const [search, setSearch] = useState("");

  const filtered = results.filter((result) =>
    result.quiz.title.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    getAllResults();
  }, []);
  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center mt-5">
          <h1 className="text-2xl font-bold">Closed Quizzes</h1>

          <div className="relative md:w-1/3 w-full ">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={22}
            />

            <Input
              className="w-full py-6 pl-10 rounded-full border border-gray-300 placeholder:text-black placeholder:text-lg"
              placeholder="Search By Name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="border border-gray-300 p-5 rounded-lg mt-5">
          <Table className="border border-gray-200 p-5 rounded-lg ">
            <TableHeader className="bg-[#0D1321] rounded-full text-center ">
              <TableRow className="hover:bg-transparent border-none text-center">
                <TableHead className="text-white text-center font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 last:border-r-0">
                  TITLE
                </TableHead>
                <TableHead className="text-white text-center font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 last:border-r-0">
                  Status
                </TableHead>
                <TableHead className="text-white text-center font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 last:border-r-0 ">
                  Code
                </TableHead>
                <TableHead className="text-white font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 last:border-r-0 text-center">
                  Duration
                </TableHead>
                <TableHead className="text-white font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 last:border-r-0 text-center">
                  Schedule
                </TableHead>
                <TableHead className="text-white font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 last:border-r-0 text-center">
                  Difficulty
                </TableHead>
                <TableHead className="text-white font-bold uppercase py-4 px-6 text-[14px] tracking-wider text-center">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-xl text-gray-400 font-mono  "
                  >
                    No closed quizzes found.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((result) => (
                <TableRow
                  className="text-center tracking-widest py-5"
                  key={result.quiz._id}
                >
                  <TableCell className="font-medium tracking-widest py-5">
                    {result.quiz.title}
                  </TableCell>
                  <TableCell>{result.quiz.status}</TableCell>
                  <TableCell>{result.quiz.code}</TableCell>
                  <TableCell className="text-center tracking-widest py-5">
                    {result.quiz.duration} MIN
                  </TableCell>
                  <TableCell className="text-center tracking-widest py-5">
                    {new Date(result.quiz.schadule).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell className="text-center tracking-widest px-4 py-5">
                    {result.quiz.difficulty}
                  </TableCell>
                  <TableCell className="mx-auto flex px-4 py-3 text-center justify-center items-center gap-x-2 text-md cursor-pointer">
                    <Eye size={28} className="cursor-pointer text-green-500 " />
                    View
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
