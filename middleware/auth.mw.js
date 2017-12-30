"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}
exports.isLoggedIn = isLoggedIn;
function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    }
    else {
        res.sendStatus(403);
    }
}
exports.isAdmin = isAdmin;
function canUpdateUser(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    }
    else if (req.user.role === 'manager') {
        if (req.user.teamid === req.user.teamid) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(403);
    }
}
exports.canUpdateUser = canUpdateUser;
