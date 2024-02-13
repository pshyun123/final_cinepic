import axios from "axios";
import Common from "../util/Common";

const BoardCommentApi = {
  // 댓글 저장하기
  saveNewComment: async (boardId, text) => {
    console.log("작성 댓글 : " + text);
    const data = {
      boardId: boardId,
      commentText: text,
    };
    return await axios.post(
      Common.CP_DOMAIN + "/comment/new",
      data,
      Common.tokenHeader()
    );
  },

  // 댓글 수정
  commentModify: async (boardCommentId, text) => {
    console.log("댓글 수정 : " + boardCommentId);
    const data = {
      id: boardCommentId,
      commentText: text,
    };
    return await axios.post(
      Common.CP_DOMAIN + "/comment/modify",
      data,
      Common.tokenHeader()
    );
  },

  // 댓글 삭제
  commentDelete: async (id) => {
    console.log("댓글 삭제 : " + id);
    return await axios.delete(
      Common.CP_DOMAIN + `/comment/delete/${id}`,
      Common.tokenHeader()
    );
  },

  // 댓글 전체 조회
  commentList: async (id) => {
    console.log("댓글 포스트 id : " + id);
    return await axios.get(
      Common.CP_DOMAIN + `/comment/${id}`,
      Common.tokenHeader()
    );
  },

  // 댓글 페이지 수
  totalBoardCommentPage: async (boardId) => {
    console.log("댓글 총 페이지수 : " + boardId);
    const page = 0;
    const size = 5;
    return await axios.get(
      Common.CP_DOMAIN + `/comment/page/${boardId}?page=${page}&size=${size}`,
      Common.tokenHeader()
    );
  },

  // 댓글 페이지네이션
  boardCommentPageList: async (boardId, page) => {
    return await axios.get(
      Common.CP_DOMAIN +
        `/comment/page/list/${boardId}?page=${page - 1}&size=5`,
      Common.tokenHeader()
    );
  },
};
export default BoardCommentApi;
