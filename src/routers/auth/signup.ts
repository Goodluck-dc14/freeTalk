import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../../src/models/user";
import jwt from "jsonwebtoken";
import { BadRequestError, validationRequest } from "../../../common";
import { body } from "express-validator";

const router = Router();

router.post(
  "/signup",
  [
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("A valid email is required"),

    body("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("A valid password is required"),
  ],
  validationRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) return next(new BadRequestError("User already exists"));

    const newUser = User.build({
      email,
      password,
    });

    await newUser.save();
    req.session = {
      jwt: jwt.sign({ email, userId: newUser._id }, process.env.JWT_KEY!, {
        expiresIn: "10h",
      }),
    };

    res.status(200).send(newUser);
  }
);

export { router as signupRouter };
