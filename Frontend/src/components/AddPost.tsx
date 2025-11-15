import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../apiHelper";

export const AddPost = () => {

    const [text, setText] = useState(""); 
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["posts"]});
            setText("");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = text.trim();
        if(!trimmed) return;

        mutation.mutate({post: trimmed})
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
        >
            <input 
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a post..."
                className="flex-1 p-2 border border-gray-300 rounded-lg outline-blue-500"
            />

            <button
                className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Add
            </button>
        </form>
    );
}