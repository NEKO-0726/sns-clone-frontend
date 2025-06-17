"use client";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import apiClient from "@/lib/apiClient";
import { PostType } from "@/types";

const Timeline = () => {
  const [postText, setPostText] = useState<string>("");

  //投稿する最新記事を配列で保持する
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //リロードを避ける
    try {
      const newPost = await apiClient.post("/posts/post", {
        content: postText,
      });
      console.log(newPost.data);

      setLatestPosts((prevPosts) => [newPost.data, ...prevPosts]);

      setPostText(""); // 投稿後にテキストエリアをクリア
    } catch (err) {
      console.log("投稿失敗", err);
      alert("ログインしてください");
    }
  };

  //ページを訪れた時とか、リロード時に最新の情報を取得したいからuseEffectを使う
  useEffect(() => {
    //awaitを使う時はasync関数の中で使う必要があるので、関数を作成する
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get("/posts/get_latest_post");
        setLatestPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit2}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPostText(e.target.value)
              }
              value={postText}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPosts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Timeline;
