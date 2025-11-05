import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:5000/tasks";

function TaskCreatee() {
  const [taskName, setTaskName] = useState("");

  const handleCreate = async () => {
    if (!taskName.trim()) {
      toast.warn("Please enter a task name!");
      return;
    }

    try {
      await axios.post(BASE_URL, { taskName });
      toast.success("Task created successfully!");
      setTaskName("");
    } catch (error) {
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-5">Create Task</h2>

      <div className="flex w-96">
        <input
          type="text"
          placeholder="Enter new task..."
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-md flex items-center justify-center"
          onClick={handleCreate}
        >
          <FaPlus className="mr-1" /> Add
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default TaskCreatee;
