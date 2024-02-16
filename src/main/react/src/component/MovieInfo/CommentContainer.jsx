import styled from "styled-components";
import CommentWrite from "./CommentWrite";
import Comt from "./Comt";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserStore";
import Modal from "../../util/Modal";
import PaginationUtil from "../../util/Pagination/Pagination";
import MovieDetailApi from "../../api/MovieDetailApi";
import useTokenAxios from "../../hooks/useTokenAxios";

const CommentContainerComp = styled.section`
  .container {
    padding-bottom: 80px;
    h4 {
      font-size: 1.5em;
      font-weight: 600;
      margin: 4% 2%;
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      padding-bottom: 50px;
      h4 {
        font-size: 2em;
        margin: 6% 1%;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .container {
      padding-bottom: 40px;
      h4 {
        font-size: 1.5em;
        margin: 10% 1%;
      }
    }
  }
`;

const CommentContainer = ({ movieId, userImage, userAlias }) => {
  const context = useContext(UserContext);
  const { loginStatus } = context;
  const navigate = useNavigate();
  const [movieCommentData, setMovieCommentData] = useState("");

  // 기본 접근 제한 모달
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(null);

  const closeModal = (num) => {
    setModalOpen(false);
  };

  const handleModal = (header, msg, type, num) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
    setModalConfirm(num);
  };

  // 페이지네이션 관련
  const [totalPage, setTotalPage] = useState(5);
  const [page, setPage] = useState(1);

  // 관람평 리스트 불러오기(페이지네이션)
  const fetchCommentList = async (page) => {
    const res = await MovieDetailApi.getPagedMovieComments(movieId, page);
    if (res.data !== null) {
      // console.log("관람평 페이지네이션 : ", res.data);
      setMovieCommentData(res.data);
    }
  };
  const getCommentList = useTokenAxios(() => fetchCommentList(page));
  const getFirstList = useTokenAxios(() => fetchCommentList(1));

  // 관람평 총 페이지 수 불러오기
  const fetchPage = async () => {
    setPage(1);
    const res = await MovieDetailApi.getTotalMovieCommentPages(movieId);
    if (res.data !== null) {
      // console.log("관람평 총 페이지 수 : ", res.data);
      setTotalPage(res.data);
      getFirstList();
    }
  };
  const getTotalPage = useTokenAxios(fetchPage);

  useEffect(() => {
    getCommentList();
  }, [page]);

  useEffect(() => {
    getTotalPage();
  }, []);

  // 삭제
  const [editId, setEditId] = useState("");

  const deleteComment = async () => {
    const res = await MovieDetailApi.deleteMovieComment(editId);
    if (res.data) {
      // console.log("관람평 삭제 성공");
      fetchPage();
    }
  };
  const delComment = useTokenAxios(deleteComment);

  return (
    <>
      <CommentContainerComp>
        <div className="container">
          <h4>관람평</h4>
          <CommentWrite
            movieId={movieId}
            userImage={userImage}
            userAlias={userAlias}
            handleModal={handleModal}
            fetchPage={fetchPage}
          />
          <div className="comment_box">
            {movieCommentData &&
              movieCommentData.map((comment) => (
                <Comt
                  comt={comment}
                  userAlias={userAlias}
                  key={comment.commentId}
                  handleModal={handleModal}
                  fetchPage={fetchPage}
                  setEditId={setEditId}
                />
              ))}
          </div>
          {movieCommentData.length !== 0 && (
            <PaginationUtil
              totalPage={totalPage}
              limit={5}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </CommentContainerComp>
      <Modal
        open={openModal}
        close={closeModal}
        header={modalHeader}
        children={modalMsg}
        type={modalType}
        confirm={() => {
          if (modalConfirm === 0) {
            navigate("/login");
          } else {
            closeModal();
            delComment();
          }
        }}
      />
    </>
  );
};
export default CommentContainer;
