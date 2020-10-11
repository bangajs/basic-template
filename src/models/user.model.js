const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { BCRYPT_SALT } = require("./../config")
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    role: {
      type: String,
      trim: true,
      enum: ["user", "admin"],
      default: "user"
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next()

  const hash = await bcrypt.hash(this.password, BCRYPT_SALT);
  this.password = hash;

  next();
});



module.exports = mongoose.model('users', userSchema)
