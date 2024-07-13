import { Request, Response } from "express";
import productModel from "../models/productModel";
import userModel from "../models/userModel";
import { roles } from "../utils/enums";
import { iUser } from "../interface/interfaces";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const { name, price, quantity, category, image, imageID } = req.body;

    const user: iUser | null = await userModel.findById(userID);

    if (user && user.role === roles.MERCHANT) {
      const product = await productModel.create({
        name,
        price,
        quantity,
        category,
        image,
        imageID,
      });

      user?.products?.push(product?._id);
      user.save();

      return res.status(res.statusCode).json({
        message: "Product created successfully",
        data: product,
        status: res.statusCode,
      });
    } else {
      return res.status(404).json({
        message: "User not a merchant",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(error?.status).json({
      message: error?.message,
      status: error?.status,
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user: iUser | null = (await userModel.findById(userID)) || null;

    if (user && user.role === roles.MERCHANT) {
      const products = await userModel
        .findById(userID)
        .populate({ path: "products" });

      return res.status(res.statusCode).json({
        message: "Successfully gotten all products",
        data: products?.products,
        status: res.statusCode,
      });
    } else {
      return res.status(404).json({
        message: "User not a merchant",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(error?.status).json({
      message: error?.message,
      status: error?.status,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { productID } = req.query;

    const user: any = (await userModel.findById(userID)) || null;

    if (user && user.role === roles.MERCHANT) {
      const products = await productModel.findByIdAndDelete(productID);
      user.products?.pull!(products?._id)!;
      user.save();

      return res.status(res.statusCode).json({
        message: "Product deleted successfully",
        data: products,
        status: res.statusCode,
      });
    } else {
      return res.status(404).json({
        message: "User not a merchant",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(error?.status).json({
      message: error?.message,
      status: error?.status,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { productID } = req.query;

    const user: any = (await userModel.findById(userID)) || null;

    if (user && user.role === roles.MERCHANT) {
      const products = await productModel.findByIdAndUpdate(
        productID,
        { ...req.body },
        { new: true }
      );

      return res.status(res.statusCode).json({
        message: "Product updated successfully",
        data: products,
        status: res.statusCode,
      });
    } else {
      return res.status(404).json({
        message: "User not a merchant",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: error?.message,
      status: 404,
    });
  }
};
