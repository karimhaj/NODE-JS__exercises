"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("../lib/middleware/passport");
const router = (0, express_1.Router)();
router.get("/login", (request, response, next) => {
    if (typeof request.query.redirectTo !== "string" || !request.query.redirectTo) {
        response.status(400);
        return next("missing redirectTo query string parameter");
    }
    request.session.redirectTo = request.query.redirectTo;
    response.redirect("/auth/github/login");
});
router.get("/auth/github/login", passport_1.passport.authenticate("github", {
    failureRedirect: "/auth/github/login",
    keepSessionInfo: true,
}), (request, response) => {
    if (typeof request.session.redirectTo !== "string") {
        return response.status(500).end();
    }
    response.redirect(request.session.redirectTo);
});
router.get("/logout", (request, response, next) => {
    if (typeof request.query.redirectTo !== "string" || !request.query.redirectTo) {
        response.status(400);
        return next("Missing redirectTo query string parameter");
    }
    const redirectURL = request.query.redirectTo;
    request.logout((error) => {
        if (error) {
            return next(error);
        }
        response.redirect(redirectURL);
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map