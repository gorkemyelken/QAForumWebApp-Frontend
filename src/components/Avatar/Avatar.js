import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemSecondaryAction } from "@mui/material";
import avatar from "../avatarphoto/papillon.jpg";
import "./Avatar.scss";
import { PutWithAuth } from "../../services/HttpService";

function Avatar(props) {
  const { avatarId, userId, userName } = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(avatarId);

  const saveAvatar = () => {
    PutWithAuth("/users/" + localStorage.getItem("currentUser"),{
      avatar: selectedValue,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }} style={{ margin: 50 }}>
        <CardMedia
          component="img"
          alt="User Avatar"
          image={avatar}
          title="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {userName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            User info
          </Typography>
        </CardContent>
        <CardActions>
        {localStorage.getItem("currentUser") == userId ? <Button size="small" color="primary"  onClick={handleOpen}>
          Change Avatar
        </Button> : ""}
        </CardActions>
      </Card>
      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <List dense>
          {[1, 2, 3, 4, 5, 6].map((key) => {
            const labelId = `checkbox-list-secondary-label-${key}`;
            return (
              <ListItem key={key} button>
                <CardMedia
                  style={{ maxWidth: 100 }}
                  component="img"
                  alt={`Avatar n°${key}`}
                  image={avatar}
                  title="User Avatar"
                />
                <ListItemSecondaryAction>
                  <Radio
                    edge="end"
                    value={key}
                    onChange={handleChange}
                    checked={"" + selectedValue === "" + key}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Modal>
    </div>
  );
}

export default Avatar;
