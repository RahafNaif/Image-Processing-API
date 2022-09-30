"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var images = express_1.default.Router();
images.get('/', function (req, res) {
    res.send('images');
});
module.exports = images;
