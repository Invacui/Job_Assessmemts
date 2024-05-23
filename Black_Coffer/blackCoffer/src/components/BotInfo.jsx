import React from "react";
import * as img from "../assets/assets";
import "../styles/botInfo.css";
const BotInfo = () => {
  return (
    <div className="Chat-bot-info-container">
      <div className="bot-info">
        <div className="bot-info-head one">
          <i class="fa-solid fa-chevron-left"></i>
          <p>Chat img: 0 </p>
          <p>msg</p>
        </div>
        <div className="bot-info-head">
          <i class="fa-solid fa-ellipsis-vertical"></i>
          <i class="fa-solid fa-wrench"></i>
          <i class="fa-solid fa-person"></i>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="bot-info">
        <img src={img.Bot} alt="Bot" />
      </div>
      <div className="bot-info one">
        <div className="bot-info-head">
          <i class="fa-solid fa-comment"> 0</i>
          <i class="fa-solid fa-camera"> 6</i>
        </div>
        <div className="bot-info-head x">
          <i class="fa-solid fa-camera"></i> Make Character Public
          <i class="fa-solid fa-share-nodes"></i>
        </div>
      </div>
      <div className="bot-info one">
        <div className="bot-info-head">
          <b>
            <p>Who I Am</p>
          </b>
        </div>
        <div className="bot-info-head">
          <b>
            <p>About Me</p>
          </b>
          <p>
            I am a virtual assistant powered by artificial intelligence. I am
            here to help answer your questions, provide information, and assist
            with various tasks. My goal is to provide accurate and helpful
            responses to help make your user interface as user-friendly as
            possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BotInfo;
