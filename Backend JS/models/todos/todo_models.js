import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        content:{
            type:String,
            required:true
        },
        complete:{
            type:Boolean,
            default:false
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"//user database name
        },
        subTodos:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"SubTodo"
            }
        ]//Array of sub-todos
    },
    {
        timestamps:true
    }
)

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;