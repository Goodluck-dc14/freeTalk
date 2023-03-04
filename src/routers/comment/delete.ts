import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import Comment from "../../models/comment";

const router = Router();
router.delete(
  "/api/comment/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;

    if (!commentId || !postId) {
      const error = new Error(
        "postId and commentId are both required"
      ) as CustomError;
      error.status = 400;
      next(error);
    }

    try {
      await Comment.findByIdAndRemove({ _id: commentId });
    } catch (err) {
      next(new Error("comment cannot be updated"));
    }

    await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } }
    );
    res.status(200).json({ success: true });
  }
);

export { router as deleteCommentRouter };
