import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../apiHelper";
import { useEffect, useRef } from "react";

export const PostList = () => {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: ({ pageParam }) => getPosts(pageParam),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) =>
            lastPage.hasMore ? lastPage.nextCursor : undefined
    });

    // flatten all pages into one array
    const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

    // this ref points to sentinel div that helps us detect when the user scrolls to the bottom.
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if(entry.isIntersecting && hasNextPage && !isFetchingNextPage){
                fetchNextPage();
            }
        }, { rootMargin: "200px" }); // Trigger when the bottom div is 200px before entering view.

        if(loadMoreRef.current) observer.observe(loadMoreRef.current);

        return () => observer.disconnect(); // removes the observer when the component unmounts.

    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <div className=" mt-6 ">
            <h2 className="font-bold text-xl mb-4">All Posts</h2>

            { status === "pending" && <p className="py-4 text-gray-500 text-center">Loading...</p> }

            { status === "error" && <p className="py-4 text-red-500 text-center">Failed to load posts</p> }

            {allPosts.map((p) => (
                <div
                    key={p._id}
                    className="p-4 my-3 bg-white border border-gray-100 rounded-xl shadow-sm"
                >
                    <p className="text-gray-800">{p.post}</p>
                </div>
            ))}

            {/* Invisible div that triggers loading */}
            <div ref={loadMoreRef} className="py-4 text-center text-gray-600 font-semibold">
                { isFetchingNextPage && (
                    <p>Loading more...</p>
                ) }
            </div>

            { !hasNextPage && status === "success" && (
                <p className="py-4 text-center text-gray-500 font-medium">
                    No more posts!!
                </p>
            )}

        </div>
    );
}