import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserInterface extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  generateAccessToken(): Promise<string>;
  isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    fullName: {
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
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAbsent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET as string
  );
};

const User = mongoose.model<UserInterface>("user", userSchema);

export { User, UserInterface };
