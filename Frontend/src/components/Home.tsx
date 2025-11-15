import { AddPost } from "./AddPost";
import { PostList } from "./PostList";

export const Home = () => {
    return (
        <div className="max-w-xl mx-auto py-6">
            <AddPost />
            <PostList />
        </div>
    );
};
