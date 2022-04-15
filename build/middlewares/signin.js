"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSignedIn = void 0;
function checkSignedIn(req, res, next) {
    const profile = req.user;
    if (profile == null) {
        console.log("need to signin");
        return res.redirect("/");
    }
    next();
}
exports.checkSignedIn = checkSignedIn;
