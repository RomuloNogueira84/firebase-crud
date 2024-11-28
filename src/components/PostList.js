import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; 
function PostList({ posts, fetchPosts }) {
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  const startEditing = (post) => {
    setEditingId(post.id);
    setEditingTitle(post.title);
    setEditingContent(post.content);
  };

  const handleUpdate = async (id) => {
    const postDoc = doc(db, "posts", id);
    await updateDoc(postDoc, { title: editingTitle, content: editingContent });
    fetchPosts();
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    fetchPosts();
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          {editingId === post.id ? (
            <>
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <button onClick={() => handleUpdate(post.id)}>Salvar</button>
              <button onClick={() => setEditingId(null)}>Cancelar</button>
            </>
          ) : (
            <>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={() => startEditing(post)}>Edit</button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;

