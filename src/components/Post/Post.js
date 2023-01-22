import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Post.scss";
import CommentForm from "../Comment/CommentForm";
import Comment from "../Comment/Comment";
import { DeleteWithAuth, PostWithAuth } from "../../services/HttpService";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { title, text, userId, userName, postId, likes } = props;
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  const [refresh,setRefresh] = useState(false);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;


  const setCommentRefresh = () => {
    setRefresh(true)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
      setRefresh(false)
  };

  const saveLike = () => {
    PostWithAuth("/likes",{
      postId: postId,
      userId: localStorage.getItem("currentUser"),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    DeleteWithAuth("/likes/" + likeId)
    .catch((err) => console.log(err));
  };

  const checkLikes = () => {
    var likeControl = likes.find((like) => ""+like.userId === localStorage.getItem("currentUser"));
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [refresh]);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <div className="postContainer">
      <Card sx={{ Width: 800 }}>
        <CardContent>
          <Typography variant="h4" color="ActiveBorder" className="title">
            {title}
          </Typography>
          <Typography variant="h6" color="ActiveBorder" className="text">
            {text}
          </Typography>
          <Typography variant="body1" className="userName">
            {userName}
          </Typography>
          <Link className="userLink" to={{ pathname: "/users/" + userId }}>
            <Avatar className="avatar" sx={{ bgcolor: "green" }}>
              {userName?.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        </CardContent>
        <CardActions disableSpacing>
                  {disabled ?                    
                  <IconButton 
                    disabled
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <FavoriteIcon style={isLiked? { color: "red" } : null} />
                    </IconButton> :
                    <IconButton 
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
            <FavoriteIcon style={isLiked? { color: "red" } : null} />
                    </IconButton>
                  }
          {likeCount}
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <InsertCommentIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed>
            {error
              ? "error"
              : isLoaded
              ? commentList.map((comment) => (
                  <Comment
                  userId = {comment.userId} 
                  userName = {comment.userName}
                    text={comment.text}
                  ></Comment>
                ))
              : "Loading"}
            {disabled ? (
              ""
            ) : (
              <CommentForm
                userId = {localStorage.getItem("currentUser")} 
                userName = {localStorage.getItem("userName")} 
                postId={postId}
                setCommentRefresh={setCommentRefresh}
              ></CommentForm>
            )}
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
