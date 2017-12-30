"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const procedures = require("../procedures/users.proc");
const auth = require("../middleware/auth.mw");
const passport = require("passport");
const utils = require("../utils");
const express_1 = require("express");
const router = express_1.Router();
router.route('/')
    .post(auth.isAdmin, (req, res) => {
    let u = req.body;
    utils.encryptPassword(u.password)
        .then((hash) => {
        return procedures.create(u.email, hash, u.firstname, u.lastname);
    }).then((id) => {
        res.send(id);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
router.get('/', auth.isLoggedIn, (req, res) => {
    procedures.all()
        .then((users) => {
        res.send(users);
    }, (err) => {
        res.sendStatus(500).send(err);
    });
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.sendStatus(500);
            }
            else {
                return res.send(user);
            }
        });
    })(req, res, next);
});
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            req.logOut();
            res.sendStatus(204);
        });
    }
});
router.get('/me', (req, res) => {
    res.send(req.user);
});
exports.default = router;
