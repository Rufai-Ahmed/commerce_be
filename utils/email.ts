import nodemailer from "nodemailer";
import { config } from "dotenv";
import { google } from "googleapis";
import ejs from "ejs";
import Mail from "nodemailer/lib/mailer";
import { iUser } from "../interface/interfaces";
import path from "path";
import {
  googleID,
  googleSecret,
  googleRedirect,
  googleToken,
} from "./constant";

const oAuth = new google.auth.OAuth2({
  clientId: googleID,
  clientSecret: googleSecret,
  redirectUri: googleRedirect,
});

oAuth.setCredentials({ refresh_token: googleToken });

export const sendVerifyCode = async (user: iUser) => {
  try {
    const accessToken: string = (await oAuth.getAccessToken())?.token!;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        clientId: googleID,
        clientSecret: googleSecret,
        accessToken: accessToken!,
        type: "OAuth2",
        user: "abbeyrufai234@gmail.com",
        refreshToken: googleToken,
      },
    });

    const htmlPath = path.join(__dirname, "../views/index.ejs");

    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      verifyCode: user.verifyCode,
      url: "",
    };

    const html: string = await ejs.renderFile(htmlPath, data);

    const options: Mail.Options = {
      from: "Tundra 👕⚡",
      subject: "Verification Code - Tundra👕⚡",
      to: user?.email!,
      html,
    };

    return await transporter.sendMail(options);
  } catch (error) {
    throw error;
  }
};
