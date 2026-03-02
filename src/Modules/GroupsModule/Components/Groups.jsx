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

export default function Groups() {

  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getAllStudents } = useStudents();

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

  // ================= Fetch Students =================
  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();

      if (Array.isArray(response?.data)) {
        setStudents(response.data);
      } else if (Array.isArray(response?.data?.data)) {
        setStudents(response.data.data);
      } else {
        setStudents([]);
      }

    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  useEffect(() => {
    getAllGroups();
    fetchStudents();
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
    if (!formData.name) return;

    try {
      if (isEditMode) {
        await axiosClient.patch(`/api/group/${selectedGroup._id}`, formData);
      } else {
        await axiosClient.post("/api/group", formData);
      }

      getAllGroups();
      setIsModalOpen(false);
      setOpenDropdown(false);

    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  // ================= Delete =================
  const deleteGroup = async (id) => {
    try {
      await axiosClient.delete(`/api/group/${id}`);
      setGroups((prev) => prev.filter((g) => g._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
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
    <div className="p-6 max-w-7xl mx-auto font-sans">

      <DeleteConfirmation
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => {
          if (selectedGroup) deleteGroup(selectedGroup._id);
          setConfirmOpen(false);
        }}
      />

      {/* ================= MODAL WITH SCROLL ================= */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md p-0 border-none rounded-xl max-h-[85vh] flex flex-col">

          {/* Fixed Header */}
          <div className="flex justify-between items-center p-4 border-b bg-white shrink-0">
            <h2 className="font-bold text-gray-700">
              {isEditMode ? "Update Group" : "Set up a new Group"}
            </h2>

            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={handleSubmit}
                className="p-2 hover:bg-gray-100 border-r"
              >
                <Check size={20} />
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 space-y-6 bg-white overflow-y-auto flex-1">

            {/* Group Name */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Group Name
              </label>

              <Input
                className="bg-gray-50 border-gray-200 h-12"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Students Dropdown */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                List Students
              </label>

              <div className="relative mt-1">

                <div
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center justify-between w-full p-3 bg-white border rounded-md h-12 cursor-pointer"
                >
                  <span className="text-gray-500 text-sm">
                    {formData.students.length > 0
                      ? `${formData.students.length} Selected`
                      : "Select students..."}
                  </span>
                  <ChevronDown size={18} />
                </div>

                {openDropdown && (
                  <div className="absolute z-20 mt-2 w-full bg-white border rounded-md shadow max-h-48 overflow-y-auto">

                    {students.length === 0 ? (
                      <div className="p-3 text-gray-400 text-sm">
                        No students found
                      </div>
                    ) : (
                      students.map((student) => (
                        <div
                          key={student._id}
                          onClick={() => toggleStudent(student._id)}
                          className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                        >
                          <span>
                            {student.first_name} {student.last_name}
                          </span>

                          {formData.students.includes(student._id) && (
                            <Check size={16} className="text-green-600" />
                          )}
                        </div>
                      ))
                    )}

                  </div>
                )}
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>

      {/* ================= HEADER ================= */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => openModal()}
          className="rounded-full bg-white text-black border gap-2 shadow-sm px-4"
        >
          <Plus size={16} className="bg-black text-white rounded-full p-0.5" />
          Add Group
        </Button>
      </div>

      {/* ================= LIST ================= */}
      <Card className="p-8 shadow-sm border-gray-100 rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">
          Groups list
        </h2>

        {loading ? (
          <Loading height="h-64" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {groups.map((group) => (
              <div
                key={group._id}
                className="flex items-center justify-between p-5 border rounded-xl hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-bold text-gray-800">
                    Group : {group.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    No. of students : {group.students?.length || 0}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openModal(group)}
                  >
                    <FileEdit size={18} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedGroup(group);
                      setConfirmOpen(true);
                    }}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}

          </div>
        )}
      </Card>
    </div>
  );
}