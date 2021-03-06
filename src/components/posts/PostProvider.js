import React, { useState, useEffect, useContext } from "react";
import { PostTagContext } from "../postTags/PostTagProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ category: {} });
  const [myPosts, setMyPosts] = useState([]);
  const [postId, setPostId] = useState(0);
  const { addPostTag } = useContext(PostTagContext);

  const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setPosts);
  };

  // const getPostsByUserId = (userId) => {
  //   userId = `${localStorage.getItem("rare_user_id")}`;
  //   return fetch(`http://localhost:8000/posts?user_id=${userId}`, {
  //     headers: {
  //       Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(setPosts);
  // };
  const getMyPosts = () => {
    return fetch("http://localhost:8000/myposts", {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setMyPosts);
  };

  const getSinglePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setPost);
  };

  const updatePost = (post) => {
    return fetch(`http://localhost:8000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getPosts);
  };

  const addPost = (post, tags) => {
    return fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        addPostTag({
          post_id: res.id,
          tag_array: tags,
        });
        console.log(tags);
      })
      .then(getPosts);
  };

  const deletePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    }).then(getPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        getPosts,
        updatePost,
        deletePost,
        getSinglePost,
        myPosts,
        getMyPosts,
        post,
        setPost,
        postId,
        setPostId,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
