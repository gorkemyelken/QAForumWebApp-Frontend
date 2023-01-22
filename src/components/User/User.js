import {React, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { GetWithAuth } from "../../services/HttpService";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import "./User.scss";

function User() {
    const { userId} = useParams();
    const [user, setUser] = useState();

    const getUser = () => {
        GetWithAuth("/users/"+userId)
          .then(res => res.json())
          .then(
              (result) => {
                  console.log(result);
                  setUser(result);
              },
              (error) => {
                  console.log(error)
              }
          )
          }

        useEffect(() => {
            getUser()
        }, [])

    return(
        <div className="root">
            {user? <Avatar avatarId={user.avatarId} /> : "" }
            <UserActivity userId={userId} />
        </div>
    )
}

export default User;