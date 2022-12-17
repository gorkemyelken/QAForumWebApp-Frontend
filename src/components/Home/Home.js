import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import Container from '@mui/material/Container';
import "./Home.scss"
import PostForm from "../Post/PostForm";


function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }


  useEffect(() => {
    refreshPosts()
  
  }, [postList])
  

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div> Error !!!</div>;
  } else if (!isLoaded) {
    return <div> Loading... </div>;
  } else {
    return (
      <div fixed className="container" >
        <PostForm userId= {1} userName= {"ddd"} refreshPosts={refreshPosts}></PostForm>
        {postList.map((post) => (
          <Post postId = {post.id} userId = {post.userId} userName = {post.userName}  
          title={post.title} text={post.text} key={post.id}></Post>
        ))}
      </div>
    );
  }
}

export default Home;
