import { styled } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import Modal from "../../util/Modal";
import MovieApi from "../../api/MovieApi";
import BookmarkApi from "../../api/BookmarkApi";
import useTokenAxios from "../../hooks/useTokenAxios";

const MovieListComp = styled.section`
  padding-bottom: 100px;
  .noBookmark {
    padding-top: 80px;
    text-align: center;
    font-size: 1.6em;
    line-height: 2.3;
    p {
      color: #888;
    }
    @media only screen and (max-width: 768px) {
      padding-top: 20px;
      font-size: 1.4em;
    }
  }

  .container {
    .sortArea {
      display: flex;
      font-weight: 500;
      font-size: 0.9rem;
      margin-bottom: 60px;
      justify-content: flex-end;
      li {
        position: relative;
        color: var(--GREY);
        font-size: 1.1em;
        margin-left: 24px;
        cursor: pointer;
        &.active {
          color: var(--BLACK);
        }
        &::after {
          content: "";
          width: 2px;
          height: 100%;
          background-color: var(--GREY);
          position: absolute;
          top: 1px;
          left: -11px;
          cursor: default;
        }
        &:first-child {
          &::after {
            display: none;
          }
        }
      }
    }

    &.mapContainer {
      min-height: 40vh;
      .mapBox {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 40px;
        @media only screen and (max-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .container {
      &.mapContainer {
        min-height: 10vh;
      }
    }
  }
`;

const MovieList = ({ sortType, keyword, sortBy, setSortBy, searchCompRef }) => {
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  const end = useRef(null);

  const fetchMovieData = async () => {
    try {
      const apiCall =
        sortType === "member"
          ? () => BookmarkApi.getMemberMovie(currentPage, 8)
          : () => MovieApi.getMovieList(keyword, sortBy, currentPage, 16);
      const res = await apiCall();

      if (res.data.length === 0) {
        // 값이 없으면 마지막 페이지
        setLastPage(true);
      } else {
        setMovieData((prevData) => [...prevData, ...res.data]);

        // 현재 타입에 따라 currentPage 갱신
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (e) {
      console.log("영화 데이터 불러오는 중 에러 발생 : ", e);
    }
  };
  const getMovieData = useTokenAxios(fetchMovieData);

  const fetchFirstMovieData = async () => {
    try {
      setMovieData([]);
      setLastPage(false);

      const apiCall =
        sortType === "member"
          ? () => BookmarkApi.getMemberMovie(0, 8)
          : () => MovieApi.getMovieList(keyword, sortBy, 0, 16);
      const res = await apiCall();

      if (res.data !== null) {
        setMovieData(res.data);
        setCurrentPage(1);
      }
    } catch (e) {
      console.log("영화 데이터 불러오는 중 에러 발생 : ", e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentPage(0);
    fetchFirstMovieData();
  }, [sortBy, keyword]);

  useEffect(() => {
    setIsLoading(true);
  }, [currentPage]);

  useEffect(() => {
    if (isLoading && !lastPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (currentPage > 0) {
              if (sortType === "member") {
                getMovieData();
              } else {
                fetchMovieData();
              }
            }
          }
        },
        { threshold: 1 }
      );
      observer.observe(end.current);
      setIsLoading(true);

      //Cleanup
      return () => {
        observer.disconnect();
      };
    }
  }, [isLoading, currentPage]);

  // 회원 북마크 해제 관련
  const [hideState, setHideState] = useState({});

  useEffect(() => {
    const hiddenMovieIds = Object.keys(hideState).filter(
      (movieId) => hideState[movieId]
    );
    // console.log(`Number of hidden movies: ${hiddenMovieIds.length}`);
    // console.log("무비길이 : " + movieData.length);
    if (hiddenMovieIds.length === movieData.length) {
      setMovieData([]);
    }
  }, [hideState]);

  const hideMovieCard = (movieId) => {
    setHideState((prevHideState) => ({
      ...prevHideState,
      [movieId]: true,
    }));
  };

  //Modal (북마크)
  const navigate = useNavigate();
  // 여기서부터
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

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
      <MovieListComp>
        {sortType === "member" && movieData.length === 0 && (
          <div className="noBookmark">
            <p>북마크 된 영화가 없습니다</p>
            <p>
              CINEPIC에서 발견한 간직하고 싶은 영화 정보에 하트를 눌러주세요
            </p>
          </div>
        )}
        <div className="container">
          {sortType !== "member" && (
            <ul className="sortArea">
              {keyword !== "" && (
                <li
                  className={sortBy === "relevant" ? "active" : ""}
                  onClick={() => {
                    setSortBy("relevant");
                  }}
                >
                  관련순
                </li>
              )}

              <li
                className={sortBy === "recent" ? "active" : ""}
                onClick={() => {
                  setSortBy("recent");
                }}
              >
                최신순
              </li>
              {keyword === "" && (
                <li
                  className={sortBy === "former" ? "active" : ""}
                  onClick={() => {
                    setSortBy("former");
                  }}
                >
                  과거순
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="container mapContainer">
          <div className="mapBox">
            {movieData &&
              movieData.map(
                (movie) =>
                  !hideState[movie.movieId] && (
                    <MovieCard
                      movie={movie}
                      key={movie.movieId}
                      handleModal={handleModal}
                      sortType={sortType}
                      hideState={hideState}
                      setHideState={setHideState}
                      hideMovie={hideMovieCard}
                    />
                  )
              )}
          </div>
        </div>

        {isLoading && <div ref={end}></div>}
        <Modal
          open={openModal}
          close={closeModal}
          header={modalHeader}
          children={modalMsg}
          type={modalType}
          confirm={() => {
            navigate("/login");
          }}
        />
      </MovieListComp>
    </>
  );
};
export default MovieList;
