import React, { useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Container from '@mui/material/Container';
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
  const { title, text, userId, userName, postId } = props;
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const isInitialMount = useRef(true);
  const [likeId, setLikeId] = useState(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
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
  };


  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [commentList]);


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
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton>
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
                    {error? "error" :
                    isLoaded? commentList.map(comment => (
                      <Comment userId = {1} userName = {"USER"} text = {comment.text}></Comment>
                    )) : "Loading"}
                    <CommentForm userId = {1} userName = {"USER"} postId = {postId}></CommentForm>
                    </Container>
                </Collapse>
                </Card>
    </div>
  );
}

export default Post;
