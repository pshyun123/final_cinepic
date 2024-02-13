import { useParams } from "react-router-dom";
import CommentContainer from "../component/MovieInfo/CommentContainer";
import MovieDetail from "../component/MovieInfo/MovieDetail";
import TabMenu from "../component/MovieInfo/TabMenu";
import { useContext, useEffect, useState } from "react";
import MovieDetailApi from "../api/MovieDetailApi";
import { UserContext } from "../context/UserStore";
import MemberApi from "../api/MemberApi";
import useTokenAxios from "../hooks/useTokenAxios";
import ImageModal from "../component/MovieInfo/ImageModal";

const MovieInfo = () => {
  const { id } = useParams();
  const context = useContext(UserContext);
  const { loginStatus } = context;

  const [movieData, setMovieData] = useState({});
  const [movieImage, setMovieImage] = useState(
    "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20220509_176%2F1652081912471yhg3N_JPEG%2Fmovie_image.jpg"
  );

  const [openModal, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleImageModal = (image) => {
    setModalOpen(true);
    setMovieImage(image);
  };

  const movieInfoData = async () => {
    try {
      const res = await MovieDetailApi.getMovieDetail(id);
      if (res.data !== null) {
        setMovieData(res.data);
      }
    } catch (err) {
      console.error("영화정보 불러오기 실패 " + err);
    }
  };

  const [userImage, setUserImage] = useState("");
  const [userAlias, setUserAlias] = useState("");

  // 회원정보 함수 res에 data값이 있으면, Alias값 저장 (props는 해놨음) -- 만들고 얘기하기 (토큰 적용)
  const userInfo = async () => {
    const res = await MemberApi.getMemberDetail();
    console.log("회원 정보 : " + res.data);
    if (res.data !== null) {
      setUserImage(res.data.image);
      setUserAlias(res.data.alias);
      console.log("회원 닉네임 : " + res.data.alias);
    }
  };
  const getUserInfo = useTokenAxios(userInfo);

  useEffect(() => {
    movieInfoData();

    if (loginStatus) {
      getUserInfo();
    }
  }, []);

  return (
    <>
      <MovieDetail
        movieDetail={movieData}
        movieId={id}
        handleImageModal={handleImageModal}
      />
      <TabMenu
        movieId={id}
        movieDetail={movieData}
        userImage={userImage}
        userAlias={userAlias}
        handleImageModal={handleImageModal}
      />
      <CommentContainer
        movieId={id}
        userImage={userImage}
        userAlias={userAlias}
      />
      <ImageModal
        movieTitle={movieData.movieTitle}
        movieImage={movieImage}
        open={openModal}
        close={closeModal}
      />
    </>
  );
};
export default MovieInfo;
