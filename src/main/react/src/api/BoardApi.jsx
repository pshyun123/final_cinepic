import axios from "axios";
import Common from "../util/Common";

const BoardApi = {
  // 게시글 저장
  saveNewPost: async (categoryName, gatherType, title, image, boardContent) => {
    const data = {
      categoryName: categoryName,
      gatherType: gatherType,
      title: title,
      image: image,
      boardContent: boardContent,
    };
    return await axios.post(
      Common.CP_DOMAIN + `/board/new`,
      data,
      Common.tokenHeader()
    );
  },

  // 게시글 수정
  updateBoard: async (
    id,
    categoryName,
    gatherType,
    title,
    image,
    boardContent
  ) => {
    const data = {
      id: id,
      categoryName: categoryName,
      gatherType: gatherType,
      title: title,
      image: image,
      boardContent: boardContent,
    };
    return await axios.post(
      Common.CP_DOMAIN + `/board/update`,
      data,
      Common.tokenHeader()
    );
  },

  // 게시글 삭제
  deleteBoard: async (id) => {
    return await axios.delete(
      Common.CP_DOMAIN + `/board/delete/${id}`,
      Common.tokenHeader()
    );
  },

  // 게시글 리스트 조회
  boardList: async () => {
    return await axios.get(
      Common.CP_DOMAIN + `/board/list`,
      Common.tokenHeader()
    );
  },

  // 게시글 상세 조회
  boardDetail: async (postId) => {
    return await axios.get(
      Common.CP_DOMAIN + `/board/post/${postId}`,
      Common.tokenHeader()
    );
  },

  // 총 페이지 수
  getTotalPage: async (keyword, categoryName, gatherType) => {
    const page = 0;
    const size = 6;
    return await axios.get(
      Common.CP_DOMAIN +
        `/board/totalpages?page=${page}&size=${size}&keyword=${keyword}&categoryName=${categoryName}&gatherType=${gatherType}`,
      Common.tokenHeader()
    );
  },
  // 페이지네이션
  getBoardList: async (page, sort, keyword, categoryName, gatherType) => {
    const size = 6;
    return await axios.get(
      Common.CP_DOMAIN +
        `/board/processedlist?page=${
          page - 1
        }&size=${size}&sort=${sort}&keyword=${keyword}&categoryName=${categoryName}&gatherType=${gatherType}`,
      Common.tokenHeader()
    );
  },
  // 자신이 쓴 글 페이지 수
  getMemTotalPage: async (type) => {
    const page = 0;
    const size = 6;
    return await axios.get(
      Common.CP_DOMAIN +
        `/board/memboard/page?page=${page}&size=${size}&type=${type}`,
      Common.tokenHeader()
    );
  },
  // 자신이 쓴 글 페이지네이션
  getMemBoardList: async (page, type) => {
    const size = 6;
    return await axios.get(
      Common.CP_DOMAIN + `/board/memboard/list?page=${page - 1}&type=${type}`,
      Common.tokenHeader()
    );
  },

  // 조회수
  boardCounter: async (postId) => {
    return await axios.put(
      Common.CP_DOMAIN + `/board/post/counter/`,
      postId,
      Common.tokenHeader()
    );
  },

  // Admin
  // 게시글 리스트 조회(페이지네이션)
  getAdminBoardList: async (page) => {
    // console.log("관리자 게시글 불러오는 중 - 페이지 : " + page);
    return await axios.get(
      Common.CP_DOMAIN + `/board/admin/boardlist?page=${page - 1}&size=10`,
      Common.tokenHeader()
    );
  },

  // 총 페이지 조회
  getAdminPages: async () => {
    // console.log("총 페이지 가져오는 중");
    const page = 0;
    const size = 10;
    return await axios.get(
      Common.CP_DOMAIN + `/board/admin/totalpage?page=${page}&size=${size}`,
      Common.tokenHeader()
    );
  },

  // 모든 카테고리 조회
  getAllCategories: async () => {
    // console.log("모든 카테고리 가져오는 중");
    return await axios.get(
      Common.CP_DOMAIN + `/board/admin/boardtype`,
      Common.tokenHeader()
    );
  },
};
export default BoardApi;
