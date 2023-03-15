import { authenticationService } from "./../../common/src/services/authentication";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password") || this.isNew) {
    const hashPwd = authenticationService.pwdToHash(this.get("password"));
  }
  done();
});

export const User = mongoose.model("User", userSchema);
