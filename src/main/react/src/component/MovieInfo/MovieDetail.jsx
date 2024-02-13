import styled from "styled-components";
import Bookmark from "../MovieSearch/Bookmark";
import { useNavigate } from "react-router-dom";

const MovieDetailComp = styled.section`
  /* width: 100vw; */
  padding: 5% 0;
  background-color: var(--BLACK);
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
    .img_box {
      width: 22%;
      position: relative;
    }
    .text_box {
      width: 40%;
      .title_box {
        font-weight: 600;
        p:nth-child(1) {
          font-size: 2.5em;
          color: #fff;
          margin-bottom: 1%;
          line-height: 1.4;
        }
        p:nth-child(2) {
          font-size: 1.5em;
          color: var(--GREY);
          margin-bottom: 10%;
          line-height: 1.2;
        }
      }
      .movie_info {
        font-size: 1.3em;
        div {
          font-weight: 600;
          margin-bottom: 5%;
        }
        span:nth-child(1) {
          width: 30%;
          color: var(--ORANGE);
          display: inline-block;
          font-weight: 900;
        }
        span:nth-child(2) {
          width: 70%;
          color: var(--GREY);
          display: inline-block;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      display: block;
      padding: 10% 0;
      .img_box {
        width: 70%;
        margin: 0 auto 10%;
      }
      .text_box {
        width: 70%;
        margin: 0 auto;

        .title_box {
          p:nth-child(1) {
            font-size: 2.5em;
            margin-bottom: 3%;
          }
          p:nth-child(2) {
            font-size: 1.7em;
            margin-bottom: 15%;
          }
        }
        .movie_info {
          font-size: 1.8em;

          div {
            font-weight: 600;
            margin-bottom: 8%;
          }
          span:nth-child(1) {
            margin-right: 5%;
            text-align: center;
          }
          span:nth-child(2) {
            width: 65%;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    padding: 10% 0;
    .container {
      padding: 0;
      .img_box {
        width: 100%;
      }
      .text_box {
        width: 100%;
        .title_box {
          p:nth-child(1) {
            font-size: 2em;
            margin-bottom: 3%;
          }
          p:nth-child(2) {
            font-size: 1.3em;
            margin-bottom: 15%;
          }
        }
        .movie_info {
          font-size: 1.3em;

          div {
            font-weight: 500;
            margin-bottom: 8%;
          }
          span:nth-child(1) {
            margin-right: 5%;
          }
          span:nth-child(2) {
            width: 65%;
          }
        }
      }
    }
  }
`;
const ImgComp = styled.div`
  width: 100%;
  padding-bottom: 144%;
  background-image: url(${(props) => props.$imgsrc});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const MovieDetail = ({ movieDetail, movieId, handleImageModal }) => {
  return (
    <>
      <MovieDetailComp>
        <div className="container">
          <div className="img_box">
            <ImgComp
              $imgsrc={movieDetail.moviePoster}
              onClick={() => {
                handleImageModal(movieDetail.moviePoster);
              }}
            />
            <Bookmark movieId={movieId} />
          </div>
          <div className="text_box">
            <div className="title_box">
              <p>{movieDetail.movieTitle}</p>
              <p>{movieDetail.movieTitleEng}</p>
            </div>
            <div className="movie_info">
              <div>
                <span>개봉</span>
                <span>{movieDetail.movieRelease}</span>
              </div>
              <div>
                <span>장르</span>
                <span>{movieDetail.movieGenre}</span>
              </div>
              <div>
                <span>국가</span>
                <span>{movieDetail.movieNation}</span>
              </div>
              <div>
                <span>등급</span>
                <span>{movieDetail.movieGrade}</span>
              </div>
              <div>
                <span>평점</span>
                <span>{movieDetail.movieScore}</span>
              </div>
              <div>
                <span>상영시간</span>
                <span>{movieDetail.movieRuntime}분</span>
              </div>
            </div>
          </div>
        </div>
      </MovieDetailComp>
    </>
  );
};
export default MovieDetail;
