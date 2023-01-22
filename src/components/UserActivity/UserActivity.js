import {React, useState, useEffect,forwardRef} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Post from '../Post/Post';
import "./UserActivity.scss";
import { GetWithAuth } from '../../services/HttpService';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function PopUp(props) {
    const {isOpen, postId, setIsOpen} = props;
    const [open, setOpen] = useState(isOpen); 
    const [post, setPost] = useState();

    const getPost = () => {
      GetWithAuth("/posts/"+postId)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setPost(result);
            },
            (error) => {
                console.log(error)
            }
        )
        }

    const handleClose = () => {
      setOpen(false);
      setIsOpen(false);
    };


    useEffect(() => {
        setOpen(isOpen);
      }, [isOpen]);

    useEffect(() => {
        getPost();
    }, [postId])

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className="appBar">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className="title">
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        {post? <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} userName = {post.userName}  
                    title={post.title} text={post.text}></Post>: "loading"}
      </Dialog>
    )
}




function UserActivity(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([]);
    const {userId} = props;
    const [isOpen, setIsOpen] = useState();
    const [selectedPost, setSelectedPost] = useState();

    const handleNotification = (postId) => {
        setSelectedPost(postId);
        setIsOpen(true);
    };

   const getActivity = () => {
    GetWithAuth("/users/activity/"+1)
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            console.log(result);
            setRows(result)
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
        }
    )
    }

    useEffect(() => {
        getActivity()
    }, [])


return (
    <div>
    {isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/>: ""}
    <Paper className='root'>
      <TableContainer className='container'>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                User Activity
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <Button className='activity' onClick={() => handleNotification(row[1])}>
                <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
                    {row[3] + " " + row[0] + " your post"}
                </TableRow>
                </Button>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>
  );
}

export default UserActivity;