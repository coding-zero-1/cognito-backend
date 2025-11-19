import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId : {type:String,required:true,unique:true},
    email: {type:String,required:true,unique:true},
    firstName: {type:String},
    photo: {type:String}
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;