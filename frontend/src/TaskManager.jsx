import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify'; // ✅ Correct import for Toastify
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // ✅ For API calls

function TaskManager() {

  // ----------------------------
  // STATES
  // ----------------------------
  const [task, setTask] = useState(''); // for new task input
  const [search, setSearch] = useState(''); // for search input
  const [tasks, setTasks] = useState([]); // for storing fetched tasks
  const [editId, setEditId] = useState(null); // to track which task is being edited

  // ----------------------------
  // FETCH TASKS FROM BACKEND
  // ----------------------------
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks'); // backend route
      setTasks(res.data.data); // save fetched tasks to state
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch tasks');
    }
  };

  // Fetch all tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // ----------------------------
  // ADD OR UPDATE TASK
  // ----------------------------
  const handleAddTask = async () => {
    if (!task.trim()) {
      toast.warning('Please enter a task name!');
      return;
    }

    try {
      if (editId) {
        // ✅ UPDATE EXISTING TASK
        await axios.put(`http://localhost:5000/tasks/${editId}`, { taskName: task });
        toast.success('Task updated successfully!');
        setEditId(null);
      } else {
        // ✅ CREATE NEW TASK
        await axios.post('http://localhost:5000/tasks', { taskName: task });
        toast.success('Task added successfully!');
      }
      setTask('');
      fetchTasks(); // refresh task list
    } catch (err) {
      console.error(err);
      toast.error('Error saving task');
    }
  };

  // ----------------------------
  // DELETE TASK
  // ----------------------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      toast.info('Task deleted!');
      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete task');
    }
  };

  // ----------------------------
  // MARK TASK AS DONE
  // ----------------------------
  const handleMarkDone = async (id, isDone) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { isDone: !isDone });
      toast.success(isDone ? 'Marked as incomplete' : 'Marked as complete');
      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update task');
    }
  };

  // ----------------------------
  // EDIT TASK
  // ----------------------------
  const handleEdit = (id, name) => {
    setEditId(id);
    setTask(name);
  };

  // ----------------------------
  // FILTER TASKS (Search)
  // ----------------------------
  const filteredTasks = tasks.filter((t) =>
    t.taskName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
      <h1 className='mb-4'>TaskManager App</h1>

      {/* Input and Search */}
      <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
        <div className='input-group flex-grow-1 me-1'>
          <input
            type='text'
            className='form-control me-1'
            placeholder='Add new task'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className='btn btn-success btn-sm me-2' onClick={handleAddTask}>
            <FaPlus className='m-2' />
          </button>
        </div>

        <div className='input-group flex-grow-1'>
          <span className='input-group-text'>
            <FaSearch />
          </span>
          <input
            className='form-control'
            type='text'
            placeholder='Search tasks'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Task List */}
      <div className='d-flex flex-column w-100'>
        {filteredTasks.map((t) => (
          <div
            key={t._id}
            className='m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center'
          >
            <span className={t.isDone ? 'text-decoration-line-through' : ''}>
              {t.taskName}
            </span>

            <div>
              <button
                type='button'
                className='btn btn-success btn-sm me-2'
                onClick={() => handleMarkDone(t._id, t.isDone)}
              >
                <FaCheck />
              </button>

              <button
                type='button'
                className='btn btn-primary btn-sm me-2'
                onClick={() => handleEdit(t._id, t.taskName)}
              >
                <FaPencilAlt />
              </button>

              <button
                type='button'
                className='btn btn-danger btn-sm me-2'
                onClick={() => handleDelete(t._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notifications */}
      <ToastContainer position='top-right' autoClose={2000} hideProgressBar={false} />
    </div>
  );
}

export default TaskManager;
