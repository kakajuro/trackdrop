import React, { useState, useEffect } from "react";

import { FaHome } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

import CustomScroll from 'react-custom-scroll';
import Spacer from "react-spacer";

import Navbar from "../components/navbar";
import Post from "../components/post";
import PostButton from "../components/postButton";

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
      parseRes.reverse();

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
      localStorage.setItem('user', parseRes.username);
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
  
  return (
    <>
      <Navbar setAuth={setAuth}/>
      <div className="main">
        <Spacer height="10px" />
        <div className="page">
          <div className="left">
            <Spacer height="100px" />
            <div className="buttons">
              <div className="button">
                <FaHome className="list-icon" size="32"/>
                <Spacer width="19px" />
                <h2>Home</h2>
                <Spacer width="3px" />
              </div>
              <Spacer height="15px" />
              <div className="button">
                <BiBookmark className="list-icon" size="32"/>
                <Spacer width="19px" />
                <h2>Saved</h2>
              </div>
              <Spacer height="20px" />
              <div className="button">
                <Spacer width="4px" />
                <BsHeartFill className="list-icon heart" size="30"/>
                <Spacer width="22px" />
                <h2>Liked</h2>
                <Spacer width="15px" />
              </div>
              <Spacer height="20px" />
              <div className="button">
                <AiOutlineUser className="list-icon" size="32"/>
                <Spacer width="19px" />
                <h2>Profile</h2>
              </div>
              <Spacer height="25px" />
              <div className="button-div">
                <PostButton />
              </div>
            </div> 
          </div>
          <div className="middle">
            <div className="header-text-container">
              <h1 className="header-text">Latest Posts:</h1>
            </div>
            <CustomScroll >
              <div className="posts-div">
                {Posts.map(post => (
                  <Post 
                    key={post.postid} 
                    title={post.title} 
                    artist={post.artist}
                    link={post.link}
                    author={post.author}
                    likes={post.likes}
                    tags={post.tags} />
                ))}
              </div>
            </CustomScroll>
          </div>
          <div className="right">

          </div>
        </div>
      </div>
    </>
  );
};