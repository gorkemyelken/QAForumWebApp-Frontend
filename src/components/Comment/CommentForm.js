import React, {useState} from "react";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, CardContent } from "@mui/material";
import "./Comment.scss";


function CommentForm(props) {
    const {userId, userName, postId} = props;
    const [text, setText] = useState("");

    const saveComment = () => {
        fetch("/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId, 
            userId : userId,
            text : text,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleChange = (value) => {
        setText(value);
    }
    return(
        <CardContent>

        <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps = {{maxLength : 250}}
        fullWidth 
        onChange = {(i) => handleChange(i.target.value)}   
        startAdornment = {
            <InputAdornment position="start">
                <Link className="userLink" to={{pathname : '/users/' + userId}}>
                    <Avatar aria-label="recipe" >
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                </Link>
            </InputAdornment>
        }
        endAdornment = {
            <InputAdornment position = "end">
            <Button
                variant = "contained"
                style = {{background: 'green',
                color: 'white'}}
                onClick = {handleSubmit}
            >Comment</Button>
            </InputAdornment>
        }
        value = {text}
        style = {{ color : "black",backgroundColor: 'white'}}
        ></OutlinedInput>
        </CardContent>

    )
}


export default CommentForm;