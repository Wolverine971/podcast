import axios from 'axios'
import { Request, Response } from "express";

const getToken = async () => {
  try {
    console.log("getting transport");
    const { google } = require("googleapis");
    const OAuth2 = google.auth.OAuth2;

    const myOAuth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_SECRET,
      process.env.ORIGIN
    );

    myOAuth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH,
    });

    const myAccessToken = await myOAuth2Client.getAccessToken();
    if (myAccessToken && myAccessToken.token) {
      return myAccessToken.token;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

const sendEmail = async (req: Request, res: Response) => {
  try {
    const {to, subject, body} = req.body
    const accessToken = await getToken();
    if (accessToken) {
      const encodedMail = Buffer.from(
        'Content-Type: text/html; charset="UTF-8"\n' +
          "MIME-Version: 1.0\n" +
          "Content-Transfer-Encoding: 7bit\n" +
          `to: ${to}\n` +
          "from: usersup@gmail.com\n" +
          `subject: ${subject}\n\n` +
          body
      )
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
      const resp = await axios.post(
        "https://www.googleapis.com/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            raw: encodedMail,
          }),
        }
      );
      return await resp;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};
