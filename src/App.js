import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import Chess from "./Component/Chess.js";
import Author from "./Component/Author.js";
import Copyright from "./Component/Copyright.js";
import CourseFilter from "./Component/CourseFilter.js";
import MenuBar from "./Component/MenuBar.js";
import MessageBandWithCTX from "./Component/MessageBand.js";
import UserInfoWithCTX from "./Component/UserInfo.js";
import MusicPlugin from "./Component/MusicPlugin.js";
import UpdateLogLoader from "./Component/UpdateLog.js";
import CourseListLoader from "./Component/CourseList.js";
import CourseCount from "./Component/CourseCount.js";
function App() {
  return (
    <>
      <MenuBar />
      <div class="ui main container" style={{ "padding-top": "7em" }}>
        <div class="ui segment" style={{ width: "1000px", left: "50px" }}>
          <div class="ui left rail" style={{ margin: 0 }}>
            <Copyright />
            <MusicPlugin />
            <UpdateLogLoader />
            <Chess />
          </div>
          <div class="ui right rail" style={{ margin: 0 }}>
            <Author />
            <UserInfoWithCTX />
            <CourseCount />
          </div>
          <MessageBandWithCTX />
          <CourseFilter />
          <CourseListLoader />
        </div>
      </div>
    </>
  );
}

export default App;
