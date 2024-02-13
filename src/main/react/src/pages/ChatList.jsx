import ChatBanner from "../component/ChatList/ChatBanner";
import ChatRoomList from "../component/ChatList/ChatRoomList";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserStore";

const ChatList = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;

  // 로그인 x → 로그인 페이지로 이동
  useEffect(() => {
    if (!loginStatus) {
      navigate("/login"); // 로그인 하지 않았다면 로그인 페이지로 이동
    }
  }, []);

  return (
    <>
      <ChatBanner />
      <ChatRoomList />
    </>
  );
};
export default ChatList;
