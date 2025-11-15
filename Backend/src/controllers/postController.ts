import express, { Request, Response } from "express"
import { postModel } from "../models/postModel";

export const createPost = async(req: Request, res: Response): Promise<void> => {
    try{
        const { post } = req.body;
        if(!post){
            res.status(400).json({
                message: "Post can not be empty"
            })
        }

        const newPost = await postModel.create({post: post.trim()});

        res.status(201).json({
            success: true,
            message: "New post is created",
            data: newPost
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


export const getPosts = async(req: Request, res: Response): Promise<void> => {
    try{
        const reqlimit = Number(req.query.limit) || 10;
        const limit = Math.min(reqlimit, 10) // cap the limit for security and performance

        const cursor = req.query.cursor as string | undefined;

        const query: any = {};
        if(cursor){
            query.createdAt = { $lt : new Date(cursor) }
        }

        const posts = await postModel.find(query)
                                     .sort({createdAt: -1})
                                     .limit(limit+1)
                                     .lean();

        const hasMore = posts.length > limit;
        if(hasMore) posts.pop(); // pop the extra one

        const nextCursor = posts.length
            ? posts[posts.length-1].createdAt 
            : null;

        // await new Promise((resolve) => setTimeout(resolve, 1000));

        res.status(200).json({
            success: true,
            message: "Fetched posts",
            posts,
            hasMore,
            nextCursor
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
