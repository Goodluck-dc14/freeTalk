import { Request, Response, NextFunction, Router } from "express";
import Post from "../../models/post";
import { BadRequestError } from "../../../common/";

const router = Router();

router.post(
  "/api/post/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { content, title } = req.body;

    if (!id) {
      return next(new Error("post id is required"));
    }

    let updatedPost;

    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: id },
        { $set: { content, title } },
        { new: true }
      );
    } catch (err) {
      return next(new BadRequestError("post cannot be updated"));
    }
    res.status(200).send(updatedPost);
  }
);

export { router as updatePostRouter };
