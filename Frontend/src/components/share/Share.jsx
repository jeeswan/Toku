import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import { MdOutlinePermMedia } from "react-icons/md";
import { TbLabelImportant } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { BsEmojiGrin } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async(e) =>{
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name
      data.append("name", fileName)
      data.append("file", file)
      newPost.img = fileName
      try {
        await axios.post("/api/upload", data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      await axios.post("/api/posts", newPost)
      window.location.reload()
    } catch (error) {
      
    }
  }
  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePic
                ? PF + user.profilePic
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            type="text"
            placeholder={"What's on your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHR" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg"/>
            <MdOutlineCancel
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <MdOutlinePermMedia
                style={{ color: "tomato" }}
                className="shareIcon"
              />
              <span className="shateOptionText">Photo/Video</span>
              <input
                style={{display: "none"}}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <TbLabelImportant
                style={{ color: "blue" }}
                className="shareIcon"
              />
              <span className="shateOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <IoLocationOutline
                style={{ color: "green" }}
                className="shareIcon"
              />
              <span className="shateOptionText">Location</span>
            </div>
            <div className="shareOption">
              <BsEmojiGrin style={{ color: "gold" }} className="shareIcon" />
              <span className="shateOptionText">Emoji</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
};

export default Share;
