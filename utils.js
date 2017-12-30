"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;
function encryptPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}
exports.encryptPassword = encryptPassword;
function checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
}
exports.checkPassword = checkPassword;
