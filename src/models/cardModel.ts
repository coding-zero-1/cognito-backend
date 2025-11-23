import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    description: {type: String},
    cloudinaryId: { type: String },
    imageUrl: { type: String },
    link:{type:String},
    clerkId: { type: String, required: true, ref:"users" },
  },
  { timestamps: true }
);
const CardModel = mongoose.model("cards", cardSchema);

export default CardModel;