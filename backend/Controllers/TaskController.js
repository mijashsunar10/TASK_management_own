const TaskModel = require("../Models/TaskModel");

const createTask = async(req,res)=>
{
    const data = req.body;

    try{

        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({message: "Task created successfully", success:true});

    }
    catch(err)
    {
        res.status(500).json({message: "Server Error", error: err.message});
    }
}

const fetchAllTask = async(req,res)=>
{
   

    try{

        const data = await TaskModel.find({});
        // await model.save();
        res.status(201).json({message: "ALl Tasks", success:true,data});

    }
    catch(err)
    {
        res.status(500).json({message: "failed to update Task ", error: err.message});
    }
}


const updateTask = async(req,res)=>
{
    // const data = req.body;

    try{

        const id = req.params.id; //id nikalni
        const body = req.body; //body ko extract garni
        const obj = {$set:{...body}}; //update garni object chainxa mongodb mA so object lai convert gardai xam and extract body
        await TaskModel.findByIdAndUpdate(id, obj); //id ra update garni object pass garni
        res.status(200).json({message: "Task Updated", success:true});

    }
    catch(err)
    {
        res.status(500).json({message: "Server Error", error: err.message});
    }
}

const deleteTask = async(req,res)=>
{
    

    try{

    const id = req.params.id; //id nikalni
       await TaskModel.findByIdAndDelete(id); 
        res.status(200).json({message: "Task is deleted", success:true});

    }
    catch(err)
    {
        res.status(500).json({message: "failed to delete ", error: err.message});
    }
}

    module.exports = {createTask, fetchAllTask, updateTask, deleteTask

}