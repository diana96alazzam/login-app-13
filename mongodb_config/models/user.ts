import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

/**
 * User model schema.
 */
const userSchema = new Schema(
  {
    user_name: {
      type: String,
      lowercase: true,
      required: [true, "required"],
      index: { unique: true },
      match: [/^[a-zA-Z0-9]+$/, "invalid"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "required"],
      index: { unique: true },
      match: [/\S+@\S+\.\S+/, "invalid"],
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

/**
 * Hashing the password before saving it to DB.
 */
userSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
