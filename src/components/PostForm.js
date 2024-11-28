import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ajustado para refletir o caminho correto

function PostForm({ fetchPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postsCollectionRef = collection(db, "posts");
    await addDoc(postsCollectionRef, { title, content });
    fetchPosts();
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Post</button>
    </form>
  );
}

export default PostForm;


