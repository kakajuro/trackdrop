import React, { useState, useEffect } from "react";

import Spacer from "react-spacer";

import Logo from "../components/logo";
import Post from "../components/post";

import "../styles/Feed.scss";

export default function Feed({ setAuth }) {
  const [name, setName] = useState("");
  const [Posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const response = await fetch("http://localhost:5000/posts/all", {
        method: "GET"
      });

      const parseRes = await response.json();

      setPosts(parseRes);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.username);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getName();
    getPosts();
  }, []);

  useEffect(() => {
    setPosts(Posts);
  }, [Posts]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  
  return (
    <>
      <nav className="navbar">
        <div className="title-section">
          <Spacer width="5px"/>
          <Logo width="50px" height="50px"/>
          <Spacer width="10px"/>
          <h1 className="site-title">trackdrop</h1>
        </div>
      </nav>
      <div>
        {Posts.map(post => (
          <Post 
            key={post.postid} 
            title={post.title} 
            artist={post.artist}
            link={post.link}
            author={post.author}
            tags={post.tags} />
        ))}
      </div>
      <button onClick={(e) => logout(e)}>
        Logout
      </button>
    </>
  );
};