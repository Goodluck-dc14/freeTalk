"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostRouter = void 0;
const express_1 = require("express");
const post_1 = __importDefault(require("../../models/post"));
const router = (0, express_1.Router)();
exports.updatePostRouter = router;
router.post("/api/post/update/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content, title } = req.body;
    if (!id) {
        const error = new Error("post id is required");
        error.status = 400;
        next(error);
    }
    let updatedPost;
    try {
        const updatedPost = yield post_1.default.findOneAndUpdate({ _id: id }, { $set: { content, title } }, { new: true });
    }
    catch (err) {
        const error = new Error("post cannot be updated");
        error.status = 400;
        next(error);
    }
    res.status(200).send(updatedPost);
}));
