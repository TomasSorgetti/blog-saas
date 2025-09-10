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
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      minlength: [5, "Password must be at least 5 characters"],
      select: false, // .findOne({ email }).select("+password");
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpires: {
      type: Date,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
    },
    loginMethods: [
      {
        provider: {
          type: String,
          enum: ["email", "google", "github", "facebook"],
          required: true,
        },
        providerId: {
          type: String,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // preferences: {
    //   language: { type: String, default: "en" },
    //   notifications: {
    //     email: {
    //       marketing: { type: Boolean, default: false },
    //       productUpdates: { type: Boolean, default: true },
    //       activity: { type: Boolean, default: true },
    //     },
    //     push: { type: Boolean, default: false },
    //   },
    // },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
