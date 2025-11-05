import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Base URL of your backend
const BASE_URL = "http://localhost:5000/tasks";

function TaskCreate() {

  const [taskName, setTaskName] = useState("");
  //React uses state to store data that changes over time.
  //taskName → a variable that stores the current text of your input.
  //setTaskName → a function used to update that variable.


//   Declares a function called handleCreate.
// async means it can use await inside (for asynchronous code, like HTTP requests).
// This function is usually called when a button is clicked (onClick={handleCreate}).

  const handleCreate = async () => {
    // basic validation checks if the input is empty
    if (!taskName.trim()) {
      toast.warn("Please enter a task name!");
      return;
    }

    try {

      await axios.post(BASE_URL, { taskName });
      //Sends a POST request to your backend URL (BASE_URL = http://localhost:5000/tasks).
      //await → waits for the request to finish before moving to the next line.
    //   { taskName } → the data sent in the request body as JSON.
      toast.success("✅ Task created successfully!");
      setTaskName(""); // reset input field
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("❌ Failed to create task.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h2>Create Task</h2>

      {/* Input + Add Button */}
      <div className="input-group mt-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)} //E is The event object that contains all the info about the change
        //   User types a letter in the input → onChange fires
        // (e) => setTaskName(e.target.value) runs → updates state taskName
        // / value={taskName} updates → input shows latest text
        />
        <button className="btn btn-success" onClick={handleCreate}>
          <FaPlus className="me-1" /> Add
        </button>
      </div>

      {/* Toast messages */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}

export default TaskCreate;
