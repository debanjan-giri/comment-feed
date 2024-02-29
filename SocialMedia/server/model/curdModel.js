import mongoose from "mongoose";

// multiple schema for curd
const curdObj = {
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

const curdSchema = new mongoose.Schema(curdObj);
const curdModel = mongoose.model("curdDB", curdSchema);
export default curdModel;
