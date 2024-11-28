import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import PostForm from "./components/PostForm"; // Corrigido para refletir a estrutura correta
import PostList from "./components/PostList"; // Corrigido para refletir a estrutura correta

function App() {
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const fetchPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Adicionando fetchPosts às dependências vazias

  return (
    <div className="App">
      <h1>React Firebase CRUD</h1>
      <PostForm fetchPosts={fetchPosts} />
      <PostList posts={posts} fetchPosts={fetchPosts} />
    </div>
  );
}

export default App;


