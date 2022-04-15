"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCallback = exports.OAUTH_OPTIONS = void 0;
const config_1 = require("../config/config");
exports.OAUTH_OPTIONS = {
    callbackURL: "/auth/google/callback",
    clientID: String(config_1.config.GOOGLE_CLIENT_ID),
    clientSecret: String(config_1.config.GOOGLE_CLIENT_SECRET),
};
const verifyCallback = (accessToken, refreshToken, profile, done) => {
    done(null, profile);
};
exports.verifyCallback = verifyCallback;
