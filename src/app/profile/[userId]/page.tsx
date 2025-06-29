import apiClient from "@/lib/apiClient";
import { PostType, Profile } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

//ユーザープロフィールを表示する。

//SSRでユーザープロフィールを取得するための関数
//userEffectを使うと、クライアントサイドでのレンダリングになってしまうため、SSRで取得する必要がある

// // 型を別に定義
// type PageProps = {
//   params: {
//     userId: string;
//   };
// };

export const dynamic = "force-dynamic";

const UserProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  try {
    const profileResponse = await apiClient.get<Profile>(
      `users/profile/${userId}`
    );
    const profile = profileResponse.data;

    const postsResponse = await apiClient.get(`/posts/${userId}`);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <div className="flex items-center">
              <img
                className="w-20 h-20 rounded-full mr-4"
                alt="User Avatar"
                src={profile.profileImageUrl}
              />
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  {profile.user.username}
                </h2>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            </div>
          </div>
          {postsResponse.data.map((post: PostType) => (
            <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <img
                    className="w-10 h-10 rounded-full mr-2"
                    alt="User Avatar"
                    src={profile.profileImageUrl}
                  />
                  <div>
                    <h2 className="font-semibold text-md">
                      {post.author.username}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("プロフィール取得エラー:", error);
    notFound(); // 404ページを表示
  }
};

export default UserProfilePage;
