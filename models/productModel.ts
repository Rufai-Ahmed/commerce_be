import { Schema, model } from "mongoose";
import { iProduct } from "../interface/interfaces";

const productModel = new Schema<iProduct>(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    rate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<iProduct>("products", productModel);
