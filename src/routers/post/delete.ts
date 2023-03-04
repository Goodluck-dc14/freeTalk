import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();
router.delete(
  "/api/post/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      const error = new Error("post is required") as CustomError;
      error.status = 400;
      next(error);
    }

    try {
      await Post.findByIdAndRemove({ _id: id });
    } catch (err) {
      next(new Error("post cannot be updated"));
    }
    res.status(200).json({ success: true });
  }
);

export { router as deletePostRouter };
