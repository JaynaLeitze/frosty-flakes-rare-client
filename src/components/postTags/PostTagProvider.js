import React, { useState } from "react";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
  const [postTags, setPostTags] = useState([]);
  const [tagDeleted, setTagDeleted] = useState(1);
  const [relatedPostTags, setRelatedPostTags] = useState([]);

  const getAllPostTags = () => {
    return fetch("http://localhost:8000/post_tags", {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setPostTags);
  };

  const deletePostTag = (postTagId) => {
    return fetch(`http://localhost:8000/post_tags/${postTagId}`, {
      method: "DELETE",
    }).then(getAllPostTags);
  };

  const addPostTag = (postTag) => {
    return fetch("http://localhost:8000/post_tags", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postTag),
    }).then(getAllPostTags);
  };

  const getPostTagsByPostId = (postId) => {
    return fetch(`http://localhost:8000/post_tags?post_id=${postId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setRelatedPostTags);
  };

  return (
    <PostTagContext.Provider
      value={{
        postTags,
        addPostTag,
        getAllPostTags,
        deletePostTag,
        getPostTagsByPostId,
        setPostTags,
        tagDeleted,
        setTagDeleted,
        setRelatedPostTags,
        relatedPostTags,
      }}
    >
      {props.children}
    </PostTagContext.Provider>
  );
};
