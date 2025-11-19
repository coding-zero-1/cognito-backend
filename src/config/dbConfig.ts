import mongoose from "mongoose";

const connectToDB = async()=>{
    try {
        if(!process.env.MONGO_URI){
            console.log("Mongo db uri not provided");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO db connected successfully");
    } catch (error) {
        console.log(`Error connecting to mongoDb: ${error}`);
        process.exit(1);
    }
}
export default connectToDB;