import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import { BadRequestError } from "../../../common/";

const router = Router();
router.delete(
  "/api/post/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new BadRequestError("post is required"));
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
