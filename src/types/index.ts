export interface Profile {
  id:       number;
  bio: string;
  profileImageUrl:    string;
  userId: number;
  user: UserType
}

export interface UserType {
  id:       number;
  username: string;
  email:    string;
  password: string;
  posts:    PostType[];
  profile: Profile;
}

export interface PostType {
    id:       number;
    content:  string;
    createdAt: string; //いつ投稿したのか
    authorId: number; //誰が投稿したのか
    author: UserType; //投稿したユーザーの情報
}
