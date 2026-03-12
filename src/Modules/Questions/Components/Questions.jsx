import React, { useEffect, useState } from "react";
import useQuestions from "@/Hooks/useQuestions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Eye, Edit, Trash2, Plus, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Questions() {
  const {
    getAllQuestions,
    data: questions,
    createQuestion,
    updateQuestion,
  } = useQuestions();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAddDialog = () => {
    setSelectedQuestion(null);
    reset({
      title: "",
      description: "",
      options: { A: "", B: "", C: "", D: "" },
      answer: "",
      type: "",
      difficulty: "",
    });
    setOpenDialog(true);
  };

  const handleEditDialog = (question) => {
    setSelectedQuestion(question);
    reset(question);
    setOpenDialog(true);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const questionData = {
      title: data.title,
      description: data.description,
      options: {
        A: data.options.A,
        B: data.options.B,
        C: data.options.C,
        D: data.options.D,
      },
      answer: data.answer,
      difficulty: data.difficulty,
      type: data.type,
    };

    if (selectedQuestion) {
      updateQuestion(selectedQuestion._id, questionData);
    } else {
      createQuestion(questionData);
    }
    reset();
    setOpenDialog(false);
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <div className="py-6 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-6 border border-black/20 dark:border-gray-700 rounded-[10px] shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-800 border-b border-black/20 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-black dark:text-gray-100">
            Bank of Questions
          </h2>
          <Button
            onClick={handleAddDialog}
            className="bg-white dark:bg-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1F2937] border border-black/20 dark:border-gray-600 rounded-[30px] px-12 h-12 flex items-center gap-3 shadow-md font-bold transition-all"
          >
            <Plus
              className="bg-black text-white rounded-full p-1 size-6"
              strokeWidth={3}
            />
            <span className="text-lg">Add Question</span>
          </Button>
        </div>

        {/* Table Content */}
        <div className="px-6 py-6">
          <div className="border border-black/20 dark:border-gray-700 shadow-sm rounded-[10px] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#0D1321] text-white ">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="text-white font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 dark:border-gray-700 last:border-r-0">
                    TITLE
                  </TableHead>
                  <TableHead className="text-white font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 dark:border-gray-700 last:border-r-0">
                    DESCRIPTION
                  </TableHead>
                  <TableHead className="text-white font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 dark:border-gray-700 last:border-r-0 text-center">
                    DIFFICULTY
                  </TableHead>
                  <TableHead className="text-white font-bold uppercase py-4 px-6 text-[14px] tracking-wider border-r border-gray-800 dark:border-gray-700 last:border-r-0 text-center">
                    TYPE
                  </TableHead>
                  <TableHead className="text-white font-bold uppercase py-4 px-6 text-[14px] tracking-wider text-center">
                    ACTIONS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions?.length > 0 ? (
                  questions.map((question, index) => (
                    <TableRow
                      key={question._id || index}
                      className="border-b border-black/20 last:border-0 hover:bg-gray-50/40"
                    >
                      <TableCell className="px-6 py-6  text-black dark:text-gray-100 font-medium text-[16px] border-r border-black/20 dark:border-gray-700 last:border-r-0">
                        {question.title}
                      </TableCell>
                      <TableCell className="px-6 py-6 text-black dark:text-gray-100 font-medium text-[16px] border-r border-black/20 dark:border-gray-700 last:border-r-0">
                        {question.description ||
                          question.question ||
                          "No description"}
                      </TableCell>
                      <TableCell className="px-6 py-6 text-center border-r border-black/20 last:border-r-0">
                        <span
                          className={`inline-block px-4 py-1.5 rounded-full text-[14px] font-medium min-w-[90px] ${
                            question.difficulty === "easy"
                              ? "bg-[#ECFDF5] text-[#065F46]"
                              : question.difficulty === "hard"
                                ? "bg-[#FFF1F2] text-[#9F1239]"
                                : question.difficulty === "medium"
                                  ? "bg-[#FFFBEB] text-[#92400E]"
                                  : "bg-[#F3F4F6] text-[#4B5563]"
                          }`}
                        >
                          {question.difficulty || "medium"}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-6 text-center border-r border-black/20 last:border-r-0">
                        <span
                          className={`inline-block px-4 py-1.5 rounded-full text-[14px] font-semibold border ${
                            question.type === "BE"
                              ? "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]"
                              : question.type === "FE"
                                ? "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]"
                                : "bg-[#EEF2FF] text-[#4338CA] border-[#C7D2FE]"
                          }`}
                        >
                          {question.type || "FE"}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-6">
                        <div className="flex items-center justify-center gap-5">
                          <button
                            className="text-[#FB7C19] cursor-pointer hover:opacity-80 transition-opacity"
                            title="View"
                          >
                            <Eye
                              size={22}
                              strokeWidth={3}
                              fill="currentColor"
                              fillOpacity={0.1}
                            />
                          </button>
                          <button
                            onClick={() => handleEditDialog(question)}
                            className="text-[#FB7C19] cursor-pointer hover:opacity-80 transition-opacity"
                            title="Edit"
                          >
                            <Edit size={20} strokeWidth={3} />
                          </button>
                          <button
                            className="text-[#FB7C19] cursor-pointer hover:opacity-80 transition-opacity"
                            title="Delete"
                          >
                            <Trash2 size={20} strokeWidth={3} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-gray-500 dark:text-gray-400"
                    >
                      No questions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* ================Add Question Modal ================ */}
        <Dialog
          open={openDialog}
          onOpenChange={(open) => {
            setOpenDialog(open);
            if (!open) setSelectedQuestion(null);
          }}
        >
          <DialogContent className="max-w-6xl! w-[95vw]! p-0 overflow-hidden border-none rounded-[15px] bg-white dark:bg-gray-800 shadow-2xl [&>button]:hidden">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Header Section with Actions */}
              <div className="flex justify-between items-center px-12 py-0 border-b border-black/10 dark:border-gray-700 min-h-[90px] bg-white dark:bg-gray-800">
                <DialogTitle className="text-3xl font-extrabold text-black dark:text-gray-100 font-sans tracking-tight">
                  {selectedQuestion
                    ? "Update question"
                    : "Set up a new question"}
                </DialogTitle>
                <div className="flex border-l border-black/10 h-[90px] items-center">
                  <button
                    type="submit"
                    className="px-14 h-full hover:bg-green-50 transition-colors cursor-pointer border-r border-black/10 flex items-center justify-center group"
                  >
                    <Check
                      size={38}
                      strokeWidth={3}
                      className="text-black group-hover:text-green-600 transition-colors"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenDialog(false)}
                    className="px-14 h-full hover:bg-red-50 transition-colors cursor-pointer flex items-center justify-center group"
                  >
                    <X
                      size={38}
                      strokeWidth={3}
                      className="text-black group-hover:text-red-600 transition-colors"
                    />
                  </button>
                </div>
              </div>

              <FieldGroup className="p-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#FB7C19] rounded-full"></div>
                  <h3 className="text-xl font-bold text-black dark:text-gray-100 border-transparent">
                    Details
                  </h3>
                </div>

                {/* Title Field - More compact */}
                <Field
                  orientation="horizontal"
                  className="border border-black/15 dark:border-gray-600 rounded-[10px] overflow-hidden h-11 bg-white dark:bg-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all gap-0"
                >
                  <FieldLabel className="bg-[#FFF1E7] px-5 flex items-center max-w-[100px] font-bold text-black border-r border-black/10 italic text-lg h-full rounded-none">
                    Title:
                  </FieldLabel>
                  <Input
                    {...register("title")}
                    className="flex-1 px-6 h-full border-none shadow-none text-black font-semibold text-lg focus-visible:ring-0 placeholder:text-gray-300 rounded-none bg-transparent"
                    placeholder="Enter the question title..."
                  />
                </Field>

                {/* Description Field - Adjusted height and move Difficulty after it */}
                <Field
                  orientation="horizontal"
                  className="border border-black/15 dark:border-gray-600 rounded-[10px] overflow-hidden min-h-[100px] bg-white dark:bg-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all gap-0"
                >
                  <FieldLabel className="bg-[#FFF1E7] px-5 py-4 flex items-start max-w-[120px] font-bold text-black border-r border-black/10 italic text-lg h-full rounded-none">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...register("description")}
                    className="flex-1 px-6 py-4 border-none shadow-none text-black font-medium text-lg focus-visible:ring-0 resize-none min-h-[100px] placeholder:text-gray-300 rounded-none bg-transparent"
                    placeholder="Provide more context or the question itself..."
                  />
                </Field>

                {/* Difficulty Field - Moved here */}
                <div className="grid grid-cols-2 gap-x-10">
                  <Field
                    orientation="horizontal"
                    className="border border-black/15 dark:border-gray-600 rounded-[10px] overflow-hidden h-11 bg-white dark:bg-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all gap-0"
                  >
                    <FieldLabel className="bg-[#FFF1E7] px-5 flex items-center max-w-[180px] font-bold text-black border-r border-black/10 italic text-lg h-full rounded-none">
                      Difficulty
                    </FieldLabel>
                    <select
                      {...register("difficulty")}
                      className="flex-1 px-6 h-full border-none bg-transparent text-black font-bold text-lg outline-none cursor-pointer focus:ring-0"
                    >
                      <option value="" disabled selected>
                        Select Difficulty
                      </option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </Field>
                </div>

                {/* Options Grid - Denser layout */}
                <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                  {["A", "B", "C", "D"].map((opt) => (
                    <Field
                      key={opt}
                      orientation="horizontal"
                      className="border border-black/15 dark:border-gray-600 rounded-[10px] overflow-hidden h-11 bg-white dark:bg-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all gap-0"
                    >
                      <FieldLabel className="bg-[#FFF1E7] px-5 flex items-center max-w-[50px] justify-center font-bold text-black border-r border-black/10 italic text-xl h-full rounded-none">
                        {opt}
                      </FieldLabel>
                      <Input
                        {...register(`options.${opt}`)}
                        className="flex-1 px-6 h-full border-none shadow-none text-black font-semibold text-lg focus-visible:ring-0 rounded-none bg-transparent"
                      />
                    </Field>
                  ))}
                </div>

                {/* Selects Row - Compact yet wide */}
                <div className="grid grid-cols-2 gap-x-10 pt-1">
                  <Field
                    orientation="horizontal"
                    className="border border-black/15 dark:border-gray-600 rounded-[10px] overflow-hidden h-11 bg-white dark:bg-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all gap-0"
                  >
                    <FieldLabel className="bg-[#FFF1E7] px-5 flex items-center max-w-[180px] font-bold text-black border-r border-black/10 italic text-lg h-full rounded-none">
                      Right Answer
                    </FieldLabel>
                    <select
                      {...register("answer")}
                      className="flex-1 px-6 h-full border-none bg-transparent text-black font-bold text-lg outline-none cursor-pointer focus:ring-0"
                    >
                      <option value="" disabled selected>
                        Select Option
                      </option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </Field>

                  <Field
                    orientation="horizontal"
                    className="border border-black/15 dark:border-gray-600 rounded-[10px] overflow-hidden h-11 bg-white dark:bg-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all gap-0"
                  >
                    <FieldLabel className="bg-[#FFF1E7] px-5 flex items-center max-w-[180px] font-bold text-black border-r border-black/10 italic text-lg h-full rounded-none">
                      Category type
                    </FieldLabel>
                    <select
                      {...register("type")}
                      className="flex-1 px-6 h-full border-none bg-transparent text-black font-bold text-lg outline-none cursor-pointer focus:ring-0"
                    >
                      <option value="" disabled selected>
                        Select Type
                      </option>
                      <option value="FE">FE</option>
                      <option value="BE">BE</option>
                      <option value="DO">DO</option>
                    </select>
                  </Field>
                </div>
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
