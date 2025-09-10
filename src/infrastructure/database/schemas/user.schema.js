import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // email
    // password
    // role 
    // isVerified
    // verificationToken
    // verificationTokenExpires
    // resetToken
    // resetTokenExpires
    // lastLogin
    // isActive
    // deletedAt
    // loginMethod
    // sessions => table
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
