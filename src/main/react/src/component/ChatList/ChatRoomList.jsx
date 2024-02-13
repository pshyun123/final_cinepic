import Button from "../../util/Button";
import { styled } from "styled-components";
import ChatRoom from "./ChatRoom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewChatModal from "./NewChatModal";
import ChatApi from "../../api/ChatApi";
import useTokenAxios from "../../hooks/useTokenAxios";

const ChatRoomListComp = styled.section`
  width: 100%;
  .container {
    padding: 100px 0;
    .buttonBox {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: end;
      margin-bottom: 50px;
    }
    .chatListBox {
      width: 80%;
      margin: 0 auto;

      .chatBox {
        width: 100%;
        background-color: var(--GREY);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        padding: 45px;
        margin-bottom: 30px;
        cursor: pointer;
        transition: 0.3s ease-out;
        &:hover {
          background-color: var(--RED);
          .title,
          .createdAt {
            color: #fff;
          }
        }
        .title {
          font-weight: 600;
          font-size: 1.5em;
        }
        .createdAt {
          font-weight: 600;
          font-size: 1.3em;
          text-align: right;
        }
      }
      .txtBox {
        padding-top: 40px;
        text-align: center;
        p {
          color: #888;
          font-size: 1.6em;
          line-height: 2.3;
        }
        @media only screen and (max-width: 480px) {
          p {
            font-size: 1.2em;
          }
        }
      }
    }
  }
  /* 모바일은 가장 밑에 두고 해야함! */
  @media only screen and (max-width: 768px) {
    .container {
      padding: 50px 0;
      .buttonBox {
        width: 100%;
        button {
          width: 120px;
        }
      }
      .chatListBox {
        width: 100%;
        .chatBox {
          padding: 45px 10px;
        }
        .txtBox {
          padding-top: 0;
        }
      }
    }
  }
`;

const ChatRoomList = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);

  // 새 채팅 생성 관련 모달
  const [openModal, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const [inputVal, setInputVal] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isActive, setIsActive] = useState(false);
  const onChangeInput = (e) => {
    const currVal = e.target.value;
    setInputVal(currVal);
    if (currVal.length < 5 || currVal.length > 15) {
      setErrMsg("5자 이상 15자 이하로 입력하세요.");
      setIsActive(false);
    } else {
      setErrMsg("키키를 만들 수 있어요!");
      setIsActive(true);
    }
  };

  // 새 채팅방 생성
  const createChatRoom = async () => {
    const res = await ChatApi.createNewChat(inputVal);
    if (res.data !== null) {
      // console.log("roomId : ", res.data);
      navigate(`/chatlist/${res.data}`);
    }
  };
  const newChatRoom = useTokenAxios(createChatRoom);

  // 채팅 리스트 호출
  const fetchChatList = async () => {
    // console.log("kikilist 부르는중");
    const res = await ChatApi.getChatList();
    if (res.data !== null) {
      // console.log("채팅방 목록 : " + res.data);
      setChatList(res.data);
    }
  };
  const getChatList = useTokenAxios(fetchChatList);

  // 채팅방 진입
  const enterKiki = (roomId) => {
    navigate(`/chatlist/${roomId}`);
  };

  // 1초 간격으로 채팅방 현황 체크
  useEffect(() => {
    const intervalId = setInterval(() => {
      getChatList();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {}, [chatList]);

  return (
    <>
      <ChatRoomListComp>
        <div className="container">
          <div className="buttonBox">
            <Button
              children="씨네톡 추가하기"
              active={true}
              front="var(--RED)"
              back="var(--DARKRED)"
              clickEvt={() => {
                setModalOpen(true);
              }}
            />
          </div>
          <div className="chatListBox">
            {chatList &&
              chatList !== null &&
              chatList.map((room) => (
                <ChatRoom
                  key={room.roomId}
                  data={room}
                  onClick={() => enterKiki(room.roomId)}
                />
              ))}
            {chatList.length === 0 && (
              <div className="txtBox">
                <p>진행중인 톡이 없습니다</p>
                <p>씨네톡을 오픈하고 새로운 영화친구를 기다려보세요!</p>
              </div>
            )}
          </div>
        </div>
        <NewChatModal
          open={openModal}
          close={closeModal}
          active={isActive}
          inputVal={inputVal}
          errMsg={errMsg}
          onChangeInput={onChangeInput}
          confirm={() => {
            newChatRoom();
          }}
        />
      </ChatRoomListComp>
    </>
  );
};
export default ChatRoomList;
