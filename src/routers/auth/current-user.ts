import { Router, Request, Response, NextFunction } from "express";
import { currentUser } from "common";

const router = Router();

router.post(
  "/current-user",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export { router as currentUserRouter };
