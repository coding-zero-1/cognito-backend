import mongoose from "mongoose";

const brainSchema = new mongoose.Schema({
    clerkId:{type:String, unique:true,required:true, ref:"users"},
    shortCode:{type:String,unique:true,required:true}
})

const BrainModel = mongoose.model("brains",brainSchema);

export default BrainModel;