import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/posts"
})

export const createPost = async(payload: {post:string}) => {
    const { data } = await api.post("/", payload);
    return data;
}

export const getPosts = async(cursor?: string) => {
    const limit = 5;
    const { data } = await api.get("/", {
        params:{ limit, cursor }
    })

    return data;
}
