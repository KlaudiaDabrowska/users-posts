import UserPosts from "@/components/UserPosts";
import React from "react";

const Posts = ({ params }: { params: { id: number } }) => {
  return <UserPosts userId={params.id} />;
};

export default Posts;
