"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const session = require("express-session");
const utils = require("../utils");
//import models from '/Users/Bran/Desktop/lab19/server/models/models.d';
let MySQLStore = require('express-mysql-session')(session);
const passport_local_1 = require("passport-local");
const userProc = require("../procedures/users.proc");
const db_1 = require("./db");
function configurePassport(app) {
    passport.use(new passport_local_1.Strategy({
        usernameField: 'user',
        passwordField: 'password'
    }, (email, password, done) => {
        let loginError = 'Invalid Login Credentials';
        userProc.readByEmail(email).then((user) => {
            if (!user) {
                return done(null, false, { message: 'Invalid Login' });
            }
            return utils.checkPassword(password, user.password)
                .then((matches) => {
                if (matches) {
                    delete user.password;
                    return done(null, user);
                }
                else {
                    return done(null, false, {
                        message: loginError
                    });
                }
            });
        }, (err) => {
            return done(err);
        });
    }));
    passport.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        userProc.readByEmail(email).then((user) => {
            if (!user) {
                return done(null, false);
            }
            if (user.password !== password) {
                return done(null, false, {
                    message: 'Nope!'
                });
            }
            return done(null, user);
        }, (err) => {
            return done(err);
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        userProc.read(id).then((user) => {
            done(null, user);
        }, (err) => {
            done(err);
        });
    });
    let sessionStore = new MySQLStore({
        createDatabaseTable: true
    }, db_1.pool);
    app.use(session({
        secret: 'random thing!',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}
exports.default = configurePassport;
;
