import { Schema, model } from "mongoose";
import { iUser } from "../interface/interfaces";
import { Types } from "mongoose";
import { roles } from "../utils/enums";

const userModel = new Schema<iUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      default: roles.BUYER,
    },
    password: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
    },
    address: {
      type: String,
    },
    number: {
      type: String,
    },
    products: [
      {
        type: Types.ObjectId,
        ref: "products",
      },
    ],
    cart: [
      {
        type: Types.ObjectId,
        ref: "products",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUser>("users", userModel);
