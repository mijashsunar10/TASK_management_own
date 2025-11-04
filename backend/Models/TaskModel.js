const mongoose = require('mongoose'); //This imports Mongoose, a library to interact with MongoDB from Node.js.

const Schema = mongoose.Schema; //A Schema defines the structure of documents (like a blueprint) in a MongoDB collection.

const TaskSchema = new Schema({
    taskName:
    {
        type: String,
        required: true
    },
    isDone:{
        type: Boolean,
        default: false
    }
});

const TaskModel = mongoose.model('todos', TaskSchema);//Creates a model called TaskModel for the todos collection in MongoDB.

module.exports = TaskModel;