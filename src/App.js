import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import PostForm from "./components/PostForm"; 
import PostList from "./components/PostList"; 
import Banner from "./components/Banner/Banner";

function App() {
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const fetchPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  return (
    <div className="App">
      <Banner/>
      <h1>Projeto CRUD com Firebase</h1>
      <h2>Crie um novo post</h2>
      <p>Clique no botão abaixo para criar um novo post</p>
      <PostForm fetchPosts={fetchPosts} />
      <PostList posts={posts} fetchPosts={fetchPosts} />
    </div>
  );
}

export default App;




