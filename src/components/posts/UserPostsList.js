import React, { useContext, useEffect } from "react";
import { PostContext } from "./PostProvider";
import { Post } from "./Post";
import { Link } from "react-router-dom";

export const UserPostList = (props) => {
  const { myPosts, getMyPosts } = useContext(PostContext);

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div>
      <h3>Posts</h3>
      <Link to="/posts/create">Create New Post</Link>
      {myPosts.map((p) => (
        <Post key={p.id} post={p} props={props} />
      ))}
    </div>
  );
};
