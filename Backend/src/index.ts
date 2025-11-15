import express, { Application } from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import { postRouter } from "./routes/postRoutes";

connectDB();

const app: Application = express();

app.use(cors())
app.use(express.json());

app.use("/api/posts", postRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}.`);
})
