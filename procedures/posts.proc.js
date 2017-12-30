"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
function all() {
    return db_1.rows('GetPosts', []);
}
exports.all = all;
function read(id) {
    return db_1.row('GetSinglePost', [id]);
}
exports.read = read;
function update(id, title, content, categoryid) {
    return db_1.empty('UpdatePosts', [id, title, content, categoryid]);
}
exports.update = update;
function create(id, title, content, userid, categoryid) {
    return db_1.rows('CreatePost', [title, content, userid, categoryid]);
}
exports.create = create;
function destroy(id) {
    return db_1.empty('DeletePost', [id]);
}
exports.destroy = destroy;
