import styled from "styled-components";
import Button from "../../util/Button";
import label from "../../images/pick.png";
import CinePickComp from "../../component/Main/CinePickStyle";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserStore";
import PreferApi from "../../api/PreferApi";
import MemberApi from "../../api/MemberApi";
import useTokenAxios from "../../hooks/useTokenAxios";

const ImgComp = styled.div`
  width: 100%;
  padding-bottom: 147%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: drop-shadow(3px 3px 3px #cccccc);
  border-radius: 5px;
`;

const CinePick = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState(""); // 선택 장르 상태
  const [movieData, setMovieData] = useState([]); // 영화 데이터 상태

  // 유저 컨텍스트에서 로그인 상태 가져오기
  const context = useContext(UserContext);
  const { loginStatus, isPrefer } = context;

  useEffect(() => {
    if (loginStatus) {
      // 로그인 상태일때: 회원 맞춤 영화 추천
      if (isPrefer) {
        preferMovies();
      }
    } else {
      // 비로그인 상태일 때 실행할 작업
      if (genre !== "") {
        // 장르가 빈문자열이 아닐경우
        getGenreRecs(genre); // 선택 장르에 대한 추천 영화 가져오기
      }
    }
  }, [loginStatus, genre, isPrefer]);

  // 회원 연결
  const getPreferMovies = async (prefer) => {
    const res = await MemberApi.getPreferMovies(prefer);
    if (res.data !== null) {
      setMovieData(res.data);
    }
  };
  const preferMovies = useTokenAxios(getPreferMovies);

  // 장르별 추천 영화 가져오기
  const getGenreRecs = async (genre) => {
    try {
      const res = await PreferApi.getRecsMovies(genre);
      if (res.data !== null) {
        setMovieData(res.data);
      }
    } catch (error) {
      console.error("장르별 추천영화 가져오는 중 오류 발생:", error);
    }
  };

  // 요일 - 장르별 영화 추천
  useEffect(() => {
    const todayGenre = getGenreByDay(); // 요일에 해당하는 장르 가져오기
    setGenre(todayGenre);
  }, []);

  const getGenreByDay = () => {
    const today = new Date().getDay(); // 현재 요일 가져오기(getDay)

    switch (today) {
      case 0:
        return "드라마"; // 일
      case 1:
        return "액션"; // 월
      case 2:
        return "코미디"; // 화
      case 3:
        return "스릴러"; // 수
      case 4:
        return "로맨스"; // 목
      case 5:
        return "판타지"; // 금
      case 6:
        return "SF"; // 토
      default:
        return "";
    }
  };

  // 영화 데이터 매핑, 영화 카드 정보 생성
  const recsList = movieData.map((item) => {
    const key = Object.keys(item)[0]; //첫번째 키를 가져옴
    return item[key];
  });

  //영화의 상세 페이지로 이동
  const toMovie = (movieId) => {
    navigate(`/moviesearch/${movieId}`);
  };

  return (
    <>
      <CinePickComp>
        <div className="container">
          <div className="cineTitle">
            <h3>
              {/* 로그인, 비로그인 상태에 따라 문구가 달라짐 */}
              {loginStatus ? (
                <>
                  <span>취향</span>에 맞춘 영화를 소개할게요!
                </>
              ) : (
                <>
                  오늘은 이 <span>영화</span>어때요?
                </>
              )}
            </h3>
            <div className="pickMovieBox">
              <div className="onePickBox">
                <div
                  className="movieCard"
                  onClick={() => {
                    movieData &&
                      movieData.length > 0 && //movieData가 비어있지 않고, 데이터가 존재할 때에만 실행
                      toMovie(movieData[0].recs1.movieId);
                  }}
                >
                  <img src={label} alt="label" className="label" />
                  <ImgComp
                    style={{
                      backgroundImage: `url(${
                        movieData &&
                        movieData.length > 0 &&
                        movieData[0].recs1.moviePoster
                      })`,
                    }}
                  />
                </div>
                <Button
                  children="상세보기"
                  // width="300px"
                  active={true}
                  front={"var(--RED)"}
                  back={"var(--DARKRED)"}
                  clickEvt={() => {
                    movieData &&
                      movieData.length > 0 &&
                      toMovie(movieData[0].recs1.movieId);
                  }}
                />
              </div>
              <div className="rightSideBox">
                <div className="textBox">
                  <div className="genre">
                    <p>
                      #
                      {!loginStatus
                        ? genre
                        : movieData.length > 0 && movieData[0].recs1.movieTitle}
                    </p>
                  </div>
                  <p className="story">
                    {movieData &&
                      movieData.length > 0 &&
                      movieData[0].recs1.moviePlot}
                  </p>
                </div>
                <div className="otherMovieBox">
                  {movieData &&
                    movieData.length > 0 &&
                    [...Array(3)].map((_, index) => (
                      <div
                        className="movieCard"
                        key={index}
                        onClick={() => {
                          toMovie(recsList[index + 1].movieId);
                        }}
                      >
                        <img src={label} alt="label" className="label" />

                        {/* 포스터 recs2번부터 가져오기 위해 index +1 해줌 */}
                        <ImgComp
                          style={{
                            backgroundImage: `url(${
                              recsList[index + 1].moviePoster
                            })`,
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CinePickComp>
    </>
  );
};

export default CinePick;
