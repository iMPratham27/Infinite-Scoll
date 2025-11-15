import express from "express"
import { createPost, getPosts } from "../controllers/postController";

export const postRouter = express.Router();

postRouter.post("/", createPost);
postRouter.get("/", getPosts);
