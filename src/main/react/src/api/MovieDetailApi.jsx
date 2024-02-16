import axios from "axios";
import Common from "../util/Common";

const MovieDetailApi = {
  // 영화 상세정보 조회
  getMovieDetail: async (movieId) => {
    return await axios.get(Common.CP_DOMAIN + `/movies/detail/${movieId}`);
  },

  // 씨네포스트 -----------------------------------------------------------
  // 포스트 상세조회
  getMoviePost: async (postId) => {
    return await axios.get(Common.CP_DOMAIN + `/movieDetail/post/${postId}`);
  },

  // 총 페이지 수(조회)
  getTotalMoviePostPages: async (movieId) => {
    // console.log("씨네포스트 총 페이지 수 :" + movieId);
    const page = 0;
    const size = 8;
    return await axios.get(
      Common.CP_DOMAIN +
        `/movies/post/page/${movieId}?page=${page}&size=${size}`,
      Common.tokenHeader()
    );
  },
  // 페이지네이션
  getPagedMoviePostList: async (movieId, page) => {
    return await axios.get(
      Common.CP_DOMAIN +
        `/movies/post/page/list/${movieId}?page=${page - 1}&size=8`,
      Common.tokenHeader()
    );
  },
  // 저장
  saveMoviePost: async (movieId, postImage, postTitle, postContent) => {
    // console.log("씨네포스트 저장 진입 ");
    const data = {
      movieId: movieId,
      postImage: postImage,
      postTitle: postTitle,
      postContent: postContent,
    };
    return await axios.post(
      Common.CP_DOMAIN + "/movieDetail/post/new",
      data,
      Common.tokenHeader()
    );
  },

  // 수정
  modifyMoviePost: async (postId, postImage, postTitle, postContent) => {
    // console.log("씨네포스트 수정 진입");
    const data = {
      postId: postId,
      postImage: postImage,
      postTitle: postTitle,
      postContent: postContent,
    };
    return await axios.post(
      Common.CP_DOMAIN + "/movieDetail/post/modify",
      data,
      Common.tokenHeader()
    );
  },
  // 삭제
  deleteMoviePost: async (id) => {
    // console.log("댓글 삭제 : " + id);
    return await axios.delete(
      Common.CP_DOMAIN + `/movieDetail/post/delete/${id}`,
      Common.tokenHeader()
    );
  },
  // 관람평 ---------------------------------------------------------------
  // 총 페이지 수(조회)
  getTotalMovieCommentPages: async (movieId) => {
    // console.log("관람평 총 페이지 수 : " + movieId);
    const page = 0;
    const size = 5;
    return await axios.get(
      Common.CP_DOMAIN +
        `/movies/comment/page/${movieId}?page=${page}&size=${size}`,
      Common.tokenHeader()
    );
  },
  // 페이지네이션
  getPagedMovieComments: async (movieId, page) => {
    return await axios.get(
      Common.CP_DOMAIN +
        `/movies/comment/page/list/${movieId}?page=${page - 1}&size=5`,
      Common.tokenHeader()
    );
  },
  // 저장
  saveMovieComment: async (movieId, field, num, text) => {
    // console.log("Api - 관람평 저장 진입");
    // console.log("영화아이디 : " + movieId);
    const ratingNum = Number(num);
    const data = {
      movieId: movieId,
      ratingField: field,
      ratingNum: ratingNum,
      ratingText: text,
    };
    return await axios.post(
      Common.CP_DOMAIN + "/movieDetail/comment/new",
      data,
      Common.tokenHeader()
    );
  },

  // 수정
  modifyMovieComment: async (commentId, field, num, text) => {
    // console.log("관람평 수정 진입");
    const data = {
      commentId: commentId,
      ratingField: field,
      ratingNum: num,
      ratingText: text,
    };
    return await axios.post(
      Common.CP_DOMAIN + "/movieDetail/comment/modify",
      data,
      Common.tokenHeader()
    );
  },
  // 삭제
  deleteMovieComment: async (id) => {
    // console.log("관람평 삭제 진입");
    return await axios.delete(
      Common.CP_DOMAIN + `/movieDetail/comment/delete/${id}`,
      Common.tokenHeader()
    );
  },
};
export default MovieDetailApi;
