import mongoose from "mongoose";

// Define schema object for authentication
const authSchemaObj = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    lowercase: true,
  },
  curdIdList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "curdDB",
    },
  ],
};

// Create Mongoose schema
const authSchema = new mongoose.Schema(authSchemaObj, {
  timestamps: true,
});

// Create and export Mongoose model
const AuthModel = mongoose.model("Auth", authSchema);
export default AuthModel;
