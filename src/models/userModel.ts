import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Password should be minimum 6 characters long"],
  },
  verified: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hashedPassword = await bcrypt.hash(this.password!, 10);
  this.password = hashedPassword;
});

userSchema.methods.verifyPassword = function (userPassword: string) {
  return bcrypt.compare(userPassword, this.password);
};

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
