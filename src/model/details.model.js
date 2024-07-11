import mongoose, { Schema } from "mongoose";

const user_details = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  dob: {
    type: Date,
    required: true,
    trim: true,
  },

  gender: {
    type: String,
    required: true,
    trim: true,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  phone_no: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },

  unique_no: {
    type: Number,
    required: true,
    unique: true,
  },

  photo: {
    type: String,
    required: false,
  },
});

export const details = mongoose.model("userDetails", user_details);
