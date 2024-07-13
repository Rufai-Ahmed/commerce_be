import { Request, Response } from "express";
import userModel from "../models/userModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendVerifyCode } from "../utils/email";
import { roles } from "../utils/enums";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;

    const verifyCode: string = crypto.randomBytes(3).toString("hex");

    const user = await userModel.create({
      email,
      role: role ? role : roles.BUYER,
      verifyCode,
    });

    sendVerifyCode(user);

    return res.status(res.statusCode).json({
      message: "User created successfully",
      data: user,
      status: res.statusCode,
    });
  } catch (error: any) {
    return res.status(error?.status).json({
      message: error?.message,
      status: error?.status,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, number, address, password, role } =
      req.body;

    const verifyCode: string = crypto.randomBytes(3).toString("hex");

    const salt: string = await bcrypt.genSalt(10);
    const hashed: string = await bcrypt.hash(password, salt);

    const user = await userModel.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        number,
        address,
        role: role ? role : roles.BUYER,
        verifyCode,
        password: hashed,
      },
      { new: true }
    );

    return res.status(res.statusCode).json({
      message: "User updated successfully",
      data: user,
      status: res.statusCode,
    });
  } catch (error: any) {
    return res.status(error?.status).json({
      message: error?.message,
      status: error?.status,
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { verifyCode } = req.query;

    let user = await userModel.findById(userID);

    if (user && user.verifyCode === verifyCode) {
      user = await userModel.findByIdAndUpdate(
        userID,
        {
          verify: true,
          verifyCode: "",
        },
        { new: true }
      );

      return res.status(res.statusCode).json({
        message: "User verified successfully",
        data: user,
        status: res.statusCode,
      });
    } else {
      return res.status(404).json({
        message: "User verification error",
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

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        if (user.verify && user.verifyCode === "") {
          return res.status(200).json({
            message: "User signed in",
            data: user,
          });
        } else {
          return res.status(res?.statusCode!).json({
            message: "User not verified",
            status: 404,
          });
        }
      } else {
        return res.status(res?.statusCode!).json({
          message: "Incorrect password",
          status: 404,
        });
      }
    } else {
      return res.status(res?.statusCode!).json({
        message: "Incorrect email",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(res?.statusCode!).json({
      message: error?.message,
      status: 404,
    });
  }
};
