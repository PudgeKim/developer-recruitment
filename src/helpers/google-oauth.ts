import {
  Profile,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";
import { config } from "../config/config";

export const OAUTH_OPTIONS: StrategyOptions = {
  callbackURL: "/auth/google/callback",
  clientID: String(config.GOOGLE_CLIENT_ID),
  clientSecret: String(config.GOOGLE_CLIENT_SECRET),
};

export const verifyCallback = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => {
  done(null, profile);
};
