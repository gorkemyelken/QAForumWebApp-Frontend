import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { CardContent } from "@mui/material";
import "./Comment.scss";

function Comment(props) {
  const { text, userId, userName } = props;

  return (
    <CardContent>
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
        startAdornment={
          <InputAdornment position="start">
            <Link className="userLink" to={{ pathname: "/users/" + userId }}>
              <Avatar aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        style={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}

export default Comment;
