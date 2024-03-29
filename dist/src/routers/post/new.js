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
exports.newPostRouter = void 0;
const express_1 = require("express");
const post_1 = __importDefault(require("../../models/post"));
const user_1 = require("../../models/user");
const common_1 = require("../../../common/");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
exports.newPostRouter = router;
router.post("/api/post/new", common_1.uploadImages, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!req.files)
        return next(new common_1.BadRequestError("images are required"));
    let images;
    if (typeof req.files === "object") {
        images = Object.values(req.files);
    }
    else {
        images = req.files ? [...req.files] : [];
    }
    if (!title || !content) {
        return next(new common_1.BadRequestError("title and content are required!"));
    }
    const newPost = post_1.default.build({
        title,
        content,
        images: images.map((file) => {
            let srcObj = {
                src: `data:${file.mimetype}; base64, ${file.buffer.toString("base64")}`,
            };
            fs_1.default.unlink(path_1.default.join("upload/" + file.filename), () => { });
            return srcObj;
        }),
    });
    yield newPost.save();
    yield user_1.User.findOneAndUpdate({ _id: req.currentUser.userId }, { $push: { posts: newPost._id } });
    res.status(201).send(newPost);
}));
