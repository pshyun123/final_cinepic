import Button from "../../../util/Button";
import { useState } from "react";
import BoardCommentApi from "../../../api/BoardCommentApi";
import useTokenAxios from "../../../hooks/useTokenAxios";
import Modal from "../../../util/Modal";
import EditModal from "./EditCommentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileImg from "../../../util/ProfileImg";

const Comment = ({ boardComment, fetchCommentList, userAlias }) => {
  const dateTimeString = boardComment.commentRegDate;
  const toDate = new Date(dateTimeString);
  const regDate = toDate.toISOString().split("T")[0];

  // 댓글 수정
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editModalContent, setEditModalContent] = useState(
    boardComment.commentText
  );

  // 수정모달 열기
  const editModalOpen = () => {
    setOpenEditModal(true);
    setEditModalContent(boardComment.commentText);
  };

  // 수정모달 닫기
  const closeEditModal = () => {
    setOpenEditModal(false);
    setEditModalContent(boardComment.commentText);
  };

  // 수정 Api
  const commentModify = async () => {
    try {
      console.log("댓글 수정 전");
      const res = await BoardCommentApi.commentModify(
        boardComment.commentId,
        editModalContent
      );
      console.log("commentId : " + boardComment.commentId);
      if (res.data !== null) {
        console.log("댓글 수정 성공");
        closeEditModal(); // 수정 모달 닫기
        fetchCommentList(); // 수정 후 댓글 목록 다시 불러오기
      }
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };
  const modiComment = useTokenAxios(commentModify);

  // 댓글 삭제
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  // 삭제 Api
  const deleteComment = async () => {
    const deleteRes = await BoardCommentApi.commentDelete(
      boardComment.commentId
    );
    if (deleteRes.data) {
      console.log("Comment 삭제 성공");
      closeModal(); // 모달 닫기
      fetchCommentList(); // 삭제 후 댓글 목록 다시 불러오기
    }
  };
  const delComment = useTokenAxios(deleteComment);

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  return (
    <>
      <div className="commentBox" key={boardComment.commentId}>
        <div className="iconArea">
          <div className="imgBox">
            {boardComment.memberImage ? (
              <ProfileImg $imgUrl={boardComment.memberImage} />
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </div>
        </div>
        <div className="textBox">
          <div className="comment">
            <p className="nickname">{boardComment.memberAlias}</p>
            <p className="commentText">{boardComment.commentText}</p>
          </div>
        </div>
        <div className="buttonBox">
          <div className="writtenDate">{regDate}</div>
          {userAlias === boardComment.memberAlias && (
            <div className="editBtnBox">
              <Button
                className="editBtn"
                children="수정"
                active={true}
                width="44%"
                height="30px"
                fontSize="1em"
                front="var(--RED)"
                back="var(--DARKRED)"
                clickEvt={editModalOpen}
              />
              <Button
                className="deleteBtn"
                children="삭제"
                width="44%"
                height="30px"
                fontSize="1em"
                front="var(--GREY)"
                back="var(--DARKGREY)"
                active={true}
                clickEvt={() => {
                  handleModal(
                    "댓글 삭제",
                    "정말 이 댓글을 삭제하시겠습니까 ?",
                    true
                  );
                }}
              />
            </div>
          )}
          <Modal
            open={openModal}
            close={closeModal}
            header={modalHeader}
            children={modalMsg}
            type={modalType}
            confirm={() => {
              delComment();
            }}
          />
          <EditModal
            open={openEditModal}
            close={closeEditModal}
            header={"댓글 수정"}
            contentVal={editModalContent}
            onChangeContent={setEditModalContent}
            type={true}
            confirm={() => modiComment()}
          />
        </div>
      </div>
    </>
  );
};
export default Comment;
