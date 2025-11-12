import React, { useContext } from "react";
import "./Feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useEffect } from "react";
import { AuthContext} from "../../context/AuthContext"
import axios from "axios";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get("/api/posts/profile/" + username)
          : await axios.get("/api/posts/timeline/" + user._id);
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
