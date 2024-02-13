import { PostComp } from "../component/Post/PostStyle";
import Button from "../util/Button";
import BoardCommentList from "../component/Post/Comment/CommentList";
import { useNavigate, useParams } from "react-router-dom";
import BoardApi from "../api/BoardApi";
import MemberApi from "../api/MemberApi";
import React, { useEffect, useState } from "react";
import useTokenAxios from "../hooks/useTokenAxios";
import Modal from "../util/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileImg from "../util/ProfileImg";

const Post = () => {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const { postId } = useParams();
  const [regDate, setRegDate] = useState("");

  // 모달창
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  const clickBtn = (num) => {
    switch (num) {
      case 1:
        // 게시글 수정
        navigate(`/board/post/revise/${postId}`);
        break;
      case 2:
        // 목록보기
        navigate(-1);
        break;
      default:
    }
  };

  // 게시글 상세 Api
  const fetchBoardData = async () => {
    console.log("API 요청 전");
    const res = await BoardApi.boardDetail(postId);
    console.log("API 요청 후 : ", res);
    if (res.data !== null) {
      setBoardData(res.data);
      const toDate = new Date(res.data.regDate);
      setRegDate(toDate.toISOString().split("T")[0]);
    }
  };
  const getBoardData = useTokenAxios(fetchBoardData);

  // 조회 수
  const fetchPostCounter = async () => {
    const res = await BoardApi.boardCounter(postId);
    if (res.data) {
      getBoardData();
    }
  };
  const getPostCounter = useTokenAxios(fetchPostCounter);

  // 멤버 정보 Api
  const fetchUserDetail = async () => {
    const res = await MemberApi.getMemberDetail();
    if (res.data !== null) {
      // 멤버 닉네임
      setUserAlias(res.data.alias);
    }
  };
  const getUserDetail = useTokenAxios(fetchUserDetail);

  // 게시글 삭제
  const handleModal = (header, msg, type) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  // 게시글 삭제 Api 및 삭제 후 페이지 이동
  const deletePost = async () => {
    const res = await BoardApi.deleteBoard(postId);
    if (res.data) {
      if (boardData.categoryName === "씨네크루") {
        navigate(`/board/gather`);
      } else {
        navigate(`/board/recap`);
      }
    }
  };
  const delPost = useTokenAxios(deletePost);

  // 게시글 내용과 멤버정보 가져오기
  useEffect(() => {
    getPostCounter();
    getUserDetail();
  }, []);
  return (
    <>
      <PostComp>
        <div className="container">
          <div className="postTop">
            <div className="profileIcon">
              <div className="profileImage">
                {boardData.memberImage ? (
                  <ProfileImg $imgUrl={boardData.memberImage} />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
            </div>
            <div className="postTopInfo">
              <div className="selectedType">
                <div className="selectedCategory">
                  <p>{`${boardData.categoryName} / ${boardData.gatherType}`}</p>
                </div>
                <div className="writtenDate">{regDate}</div>
              </div>
              <h3>{boardData.title}</h3>
              <div className="nickAndReviseBtn">
                <div className="nickname">{boardData.memberAlias}</div>
                {/* 유저의 닉네임과 보드데이터의 유저닉네임이 같다면 */}
                {userAlias === boardData.memberAlias && (
                  <div className="reviseBtnBox">
                    <Button
                      children="수정"
                      front="var(--ORANGE)"
                      back="var(--DARKRED)"
                      active={true}
                      clickEvt={() => clickBtn(1)}
                      width="100%"
                      height="30px"
                      fontSize="14px"
                    />
                    <Button
                      children="삭제"
                      front="var(--GREY)"
                      back="var(--DARKGREY)"
                      active={true}
                      clickEvt={() => {
                        handleModal(
                          "게시글 삭제",
                          "정말 이 글을 삭제하시겠습니까?",
                          true
                        );
                      }}
                      width="100%"
                      height="30px"
                      fontSize="14px"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="postMain">
            <div className="count">조회 수 {boardData.count}</div>
            <div className="contents">
              <img src={boardData.image} alt="contentsImg" />
              <div className="contentsText">
                <p>{boardData.boardContent}</p>
              </div>
            </div>
          </div>
          {/* 댓글 컴포넌트 */}
          <BoardCommentList id={postId} userAlias={userAlias} />
          {/* 목록보기 버튼 */}
          <div className="goToListBtn">
            <Button
              className="listBtn"
              children="목록보기"
              active={true}
              front="var(--RED)"
              clickEvt={() => clickBtn(2)}
            />
          </div>
        </div>
        <Modal
          open={openModal}
          close={closeModal}
          header={modalHeader}
          children={modalMsg}
          type={modalType}
          confirm={() => {
            delPost();
          }}
        />
      </PostComp>
    </>
  );
};
export default Post;
