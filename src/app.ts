import * as dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";
import {
  newPostRouter,
  deletePostRouter,
  updatePostRouter,
  showPostRouter,
  addImagesRouter,
  deleteImagesRouter,
  newCommentRouter,
  deleteCommentRouter,
} from "./routers";
import cookieSession from "cookie-session";
import {
  requireAuth,
  currentUser,
  errorHandler,
  NotFoundError,
} from "../common";

const app = express();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.set("trust proxy", true);

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, addImagesRouter);
app.use(requireAuth, deleteImagesRouter);
app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all("*", (req, res, next) => {
  return next(new NotFoundError());
});

app.use(errorHandler);

export { app };
