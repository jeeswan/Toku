import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
import { MdMoreHoriz } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { format } from "timeago.js";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setisLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext)

  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id))
  },[currentUser._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/api/posts/" + post._id + "/like", {userId:currentUser._id})
    } catch (error) {
      
    }
    setLike(isliked ? like - 1 : like + 1);
    setisLiked(!isliked);
  };

  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <NavLink to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePic ? PF + user.profilePic : PF + "person/noAvatar.png"}
                alt=""
              />
            </NavLink>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MdMoreHoriz />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className="postImage" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <FaRegHeart className="likeIcon" onClick={likeHandler} />
            <AiOutlineLike className="likeIcon" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
