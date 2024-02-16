import Button from "../../../util/Button";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import BoardCommentApi from "../../../api/BoardCommentApi";
import useTokenAxios from "../../../hooks/useTokenAxios";
import PaginationUtil from "../../../util/Pagination/Pagination";

const BoardCommentList = ({ id, userAlias }) => {
  const [commentData, setCommentData] = useState([]);
  const [inputComment, setInputComment] = useState("");

  // 페이지네이션 부분
  const [totalPage, setTotalPage] = useState(5);
  const [page, setPage] = useState(1);

  const inputCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  // 댓글 저장
  const submitComment = async () => {
    try {
      const response = await BoardCommentApi.saveNewComment(id, inputComment);
      // console.log("댓글 저장 결과 : ", response.data);
      if (response.data) {
        // console.log("댓글이 성공적으로 저장되었습니다.");
        setInputComment("");
        getTotalPage();
      } else {
        // console.log("댓글 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 저장 중 오류 발생:", error);
    }
  };
  const saveComment = useTokenAxios(submitComment);

  // 댓글 리스트 불러오기
  const fetchCommentList = async (page) => {
    try {
      const res = await BoardCommentApi.boardCommentPageList(id, page);
      if (res.data !== null) {
        // console.log("댓글 페이지네이션 : ", res.data);
        setCommentData(res.data);
      }
    } catch (error) {
      console.error("댓글 목록 불러오기 중 오류 발생:", error);
    }
  };
  const getCommentList = useTokenAxios(() => fetchCommentList(page));
  const getFirstPage = useTokenAxios(() => fetchCommentList(1));

  // 댓글 총 페이지수
  const fetchPage = async () => {
    setPage(1);
    const rsp = await BoardCommentApi.totalBoardCommentPage(id);
    if (rsp.data !== null) {
      // console.log("댓글 총 페이지 수 : ", rsp.data);
      setTotalPage(rsp.data);
      getFirstPage();
    }
  };
  const getTotalPage = useTokenAxios(fetchPage);

  useEffect(() => {
    getCommentList();
  }, [page]);

  useEffect(() => {
    getTotalPage();
  }, []);

  return (
    <>
      <div className="commentArea">
        <h3>댓글</h3>
        {commentData && commentData.length > 0 ? (
          <>
            <div className="commentList">
              {commentData.map((boardComment) => (
                <Comment
                  key={boardComment.boardCommentId}
                  userAlias={userAlias}
                  boardComment={boardComment}
                  fetchCommentList={getTotalPage}
                />
              ))}
            </div>
            <PaginationUtil
              totalPage={totalPage}
              limit={3}
              page={page}
              setPage={setPage}
            />
          </>
        ) : (
          <p className="noComment">등록된 댓글이 없습니다.</p>
        )}

        <div className="textInputBox">
          <textarea
            type="text"
            placeholder="100자 이하로 댓글을 남겨주세요."
            value={inputComment}
            onChange={inputCommentChange}
          ></textarea>
          <Button
            className="postBtn"
            children="등록"
            active={inputComment.length > 0 && inputComment.length < 101}
            width="70px"
            height="30px"
            fontSize="14px"
            clickEvt={saveComment}
          />
        </div>
      </div>
    </>
  );
};

export default BoardCommentList;
