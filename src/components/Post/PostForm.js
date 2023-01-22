import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./Post.scss";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, InputAdornment } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { PostWithAuth } from "../../services/HttpService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PostForm(props) {
  const { userId, userName, refreshPosts } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);

  const savePost = () => {
    PostWithAuth("/posts",{
      title: title,
      userId: localStorage.getItem("currentUser"),
      text: text,
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  return (
    <div className="postContainer">
      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your post is sent!
        </Alert>
      </Snackbar>
      <Card sx={{ Width: 800 }}>
        <CardContent>
          <Typography variant="h4" color="ActiveBorder" className="title">
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 50 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            ></OutlinedInput>
          </Typography>
          <Typography variant="h6" color="ActiveBorder" className="text">
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Text"
              inputProps={{ maxLength: 500 }}
              fullWidth
              value={text}
              onChange={(i) => handleText(i.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    style={{
                      background: "#2e7a0d",
                      color: "white",
                    }}
                    onClick={handleSubmit}
                  >
                    Post
                  </Button>
                </InputAdornment>
              }
            ></OutlinedInput>
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
      </Card>
    </div>
  );
}

export default PostForm;
