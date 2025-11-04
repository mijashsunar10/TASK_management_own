const express = require('express');
const router = express.Router();
const TaskModel = require('../Models/TaskModel');

const {createTask, fetchAllTask, updateTask, deleteTask} = require('../Controllers/TaskController');


//to fetch all tasks
router.get('/',  fetchAllTask
)


//to create a task
router.post('/', createTask);

//to update a task

router.put('/:id',updateTask)


//to delete  task
router.delete('/:id',deleteTask)

module.exports = router;
