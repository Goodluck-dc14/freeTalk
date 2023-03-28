import { Router, Request, Response, NextFunction } from "express";
import Comment from "../../models/comment";
import Post from "../../models/post";
import { BadRequestError } from "../../../common";

const router = Router();

router.post(
  "/api/comment/new/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, content } = req.body;
    const { postId } = req.params;

    if (!content) {
      return next(new BadRequestError("content is required!"));
    }

    const newComment = Comment.build({
      userName: userName ? userName : "anonymous",
      content,
    });

    await newComment.save();

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment } },
      { new: true }
    );

    res.status(201).send(updatedPost);
  }
);

export { router as newCommentRouter };
