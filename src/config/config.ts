import dotenv from "dotenv";

dotenv.config();

export const config = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  COOKIE_SESSION_SECRET: process.env.COOKIE_SECRET,
};
