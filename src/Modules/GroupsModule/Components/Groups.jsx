import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, FileEdit, Plus, Check, X, ChevronDown } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import DeleteConfirmation from "@/Shared/DeleteConfirmation/DeleteConfirmation";
import Loading from "@/Shared/Loading/Loading";
import axiosClient from "@/Api/AxiosClient";
import useStudents from "@/Hooks/useStudent";
import { toast } from "react-toastify";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAllStudents, students } = useStudents();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    students: [],
  });

  // ================= Fetch Groups =================
  const getAllGroups = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/group");
      if (Array.isArray(response.data)) {
        setGroups(response.data);
      } else if (Array.isArray(response.data?.data)) {
        setGroups(response.data.data);
      } else {
        setGroups([]);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllGroups();
    getAllStudents();
  }, []);

  // ================= Open Modal =================
  const openModal = (group = null) => {
    if (group) {
      setIsEditMode(true);
      setSelectedGroup(group);
      setFormData({
        name: group.name,
        students: group.students || [],
      });
    } else {
      setIsEditMode(false);
      setFormData({
        name: "",
        students: [],
      });
    }
    setIsModalOpen(true);
  };

  // ================= Submit =================
  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Please enter a group name");
      return;
    }

    try {
      if (isEditMode) {
        let response = await axiosClient.put(
          `/api/group/${selectedGroup._id}`,
          formData,
        );
        toast.success(response.data.message);
      } else {
        let response = await axiosClient.post("/api/group", formData);
        toast.success(response.data.message);
      }
      getAllGroups();
      setIsModalOpen(false);
      setOpenDropdown(false);
    } catch (error) {
      toast.error(error.response?.data.message || "Something went wrong");
    }
  };

  // ================= Delete =================
  const deleteGroup = async (id) => {
    try {
      let response = await axiosClient.delete(`/api/group/${id}`);
      toast.success(response.data.message);
      setGroups((prev) => prev.filter((g) => g._id !== id));
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  // ================= Toggle Student =================
  const toggleStudent = (id) => {
    const exists = formData.students.includes(id);
    if (exists) {
      setFormData({
        ...formData,
        students: formData.students.filter((s) => s !== id),
      });
    } else {
      setFormData({
        ...formData,
        students: [...formData.students, id],
      });
    }
  };

  return (
    <div className="p-6 w-11/12  mx-auto font-sans ">
      <DeleteConfirmation
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => {
          if (selectedGroup) deleteGroup(selectedGroup._id);
          setConfirmOpen(false);
        }}
      />

      {/* ================= MODAL (UI UPDATED) ================= */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 border-none rounded-none shadow-2xl overflow-hidden flex flex-col outline-none">
          {/* Header Section */}
          <div className="flex justify-between items-stretch border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            <div className="flex-1 p-6 flex items-center">
              <h2 className="text-2xl font-bold text-black dark:text-gray-100 tracking-tight">
                {isEditMode ? "Update Group" : "Set up a new Group"}
              </h2>
            </div>

            <div className="flex border-l border-gray-300 h-full">
              <button
                onClick={handleSubmit}
                className="w-20 flex items-center justify-center hover:bg-gray-50 border-r border-gray-300 transition-colors py-6"
              >
                <Check
                  size={36}
                  strokeWidth={2.5}
                  className="text-black dark:text-white dark:hover:text-black"
                />
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-20 flex items-center justify-center hover:bg-gray-50 transition-colors py-6"
              >
                <X
                  size={36}
                  strokeWidth={2.5}
                  className="text-black dark:text-white dark:hover:text-black"
                />
              </button>
            </div>
          </div>

          {/* Body Section */}
          <div className="p-10 space-y-8 bg-white dark:bg-gray-800 min-h-[300px] overflow-auto">
            {/* Group Name Input Group */}
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden ring-offset-background focus-within:ring-2 focus-within:ring-black/5">
              <div className="bg-[#FEF1E8] px-6 py-4 border-r border-gray-300 min-w-[160px] text-lg font-medium text-black">
                Group Name
              </div>
              <input
                type="text"
                className="flex-1 px-5 py-4 outline-none text-lg bg-transparent dark:text-white"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Students Dropdown Group */}
            <div className="relative">
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center border border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-all"
              >
                <div className="bg-[#FEF1E8] px-6 py-4 border-r border-gray-300 min-w-[160px] text-lg font-medium text-black">
                  List Students
                </div>
                <div className="flex-1 px-5 py-4 flex justify-between items-center text-lg">
                  <span
                    className={
                      formData.students.length > 0
                        ? "text-black"
                        : "text-gray-400"
                    }
                  >
                    {formData.students.length > 0
                      ? `${formData.students.length} Selected`
                      : "Select students..."}
                  </span>
                  <ChevronDown
                    size={32}
                    strokeWidth={2}
                    className="text-black dark:text-white ml-2"
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              {openDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
                  {students.length === 0 ? (
                    <div className="p-5 text-gray-400 text-center">
                      No students available
                    </div>
                  ) : (
                    students.map((student) => (
                      <div
                        key={student._id}
                        onClick={() => toggleStudent(student._id)}
                        className="p-4 hover:bg-orange-50 dark:hover:bg-orange-900 cursor-pointer flex justify-between items-center border-b border-gray-50 dark:border-gray-700 last:border-none transition-colors"
                      >
                        <span className="text-lg text-gray-700 dark:text-white">
                          {student.first_name} {student.last_name}
                        </span>
                        {formData.students.includes(student._id) && (
                          <div className="bg-black rounded-full p-1">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ================= MAIN UI ================= */}
      <div className="flex justify-between items-center mb-8   ">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Groups Management
        </h1>
        <Button
          onClick={() => openModal()}
          className="rounded-full bg-black text-white hover:bg-gray-800 gap-2 px-6 h-12 shadow-lg transition-transform active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          Add Group
        </Button>
      </div>

      <Card className="p-8 shadow-sm border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-b pb-4">
          Groups list
        </h2>

        {loading ? (
          <Loading height="h-64" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {groups.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400">
                No groups found. Create your first one!
              </div>
            ) : (
              groups.map((group) => (
                <div
                  key={group._id}
                  className="flex items-center justify-between p-6 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-orange-200 hover:shadow-md transition-all bg-white dark:bg-gray-800"
                >
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">
                      Group : {group.name}
                    </h3>
                    <p className="text-sm font-medium text-orange-600 mt-1">
                      Students count: {group.students?.length || 0}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => openModal(group)}
                    >
                      <FileEdit className="dark:text-white" size={20} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        setSelectedGroup(group);
                        setConfirmOpen(true);
                      }}
                    >
                      <Trash2 className="text-red-500" size={20} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
