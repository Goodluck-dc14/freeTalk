import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import Comment from "../../models/comment";
import { BadRequestError } from "../../../common";

const router = Router();
router.delete(
  "/api/comment/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;

    if (!commentId || !postId) {
      return next(
        new BadRequestError("postId and commentId are both required")
      );
    }

    try {
      await Comment.findByIdAndRemove({ _id: commentId });
    } catch (err) {
      next(new Error("comment cannot be updated"));
    }

    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } },
      { new: true }
    );

    if (!post) return next(new Error());
    res.status(200).send(post);
  }
);

export { router as deleteCommentRouter };
