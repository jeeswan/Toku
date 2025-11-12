import React, { useEffect, useState, useContext } from "react";
import "./Rightbar.css";
import { FaGift } from "react-icons/fa";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const Rightbar = ({ user }) => {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser.followings, user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/api/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/api/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/api/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <FaGift
            style={{ color: "tomato" }}
            size={35}
            className="birthdayIcon"
          />
          <span className="birthdayText">
            {" "}
            <b>Rose Dangol</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>

        <div className="">
          <img src="assets/ad.png" alt="" className="rightbarAD" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <IoRemoveCircleOutline /> : <IoAddCircleOutline />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <NavLink
              to={"/profile/" + friend.username}
              key={friend._id}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingImg"
                  src={
                    friend.profilePic
                      ? PF + friend.profilePic
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
                <span className="rightfollowingName">{friend.username}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbarContainer">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
