"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./procedures/api");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport_1 = require("./config/passport");
let routing = require('./middleware/routing.mw.js');
let passport = require('./config/passport.js');
let clientPath = path.join(__dirname, '../client');
let dataPath = path.join(__dirname, 'data.json');
let app = express();
app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());
passport_1.default(app);
app.use('/api', api_1.default);
app.get('*', routing.stateRouting);
const prerender = require('prerender-node');
prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
app.use(prerender);
prerender.set('prerenderServiceUrl', 'http://localhost:1337/');
console.log('listening');
app.listen(3000);
