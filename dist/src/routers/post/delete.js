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
exports.deletePostRouter = void 0;
const user_1 = require("../../models/user");
const express_1 = require("express");
const post_1 = __importDefault(require("../../models/post"));
const common_1 = require("../../../common/");
const router = (0, express_1.Router)();
exports.deletePostRouter = router;
router.delete("/api/post/delete/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return next(new common_1.BadRequestError("post is required"));
    }
    try {
        yield post_1.default.findByIdAndRemove({ _id: id });
    }
    catch (err) {
        next(new Error("post cannot be updated"));
    }
    const user = yield user_1.User.findOneAndUpdate({ _id: req.currentUser.userId }, { $pull: { posts: id } }, { new: true });
    if (!user)
        return next(new Error());
    res.status(200).send(user);
}));
