import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        // require:true,
        trim:true,
        minLength:6,
    },
},
    {timestamps:true}
);
const User= mongoose.model("User",userSchema);
export default User;