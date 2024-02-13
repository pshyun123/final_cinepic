import { useState } from "react";
import styled from "styled-components";
import crewBanner from "../../images/CrewBanner.jpg";
// import friendBanner from "../../images/ghosts1-1.jpg";
import friendBanner from "../../images/ghosts1-2.jpg";
import Button from "../../util/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ToggleButton from "./ToggleBtn";
import { useNavigate } from "react-router-dom";

const CineBannerComp = styled.section`
  width: 100%;
  background-image: url(${(props) => props.$imgsrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media only screen and (max-width: 480px) {
    max-height: 440px;
  }
  .cover {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    @media only screen and (max-width: 480px) {
      max-height: 440px;
    }
    .container {
      width: 100%;
      height: 100%;
      padding: 40px 30px;
      position: relative;
      .banner {
        width: 100%;
        height: 550px;
        ul {
          font-size: 1.3em;
          display: flex;
          gap: 20px;
          li {
            color: #fff;
            cursor: pointer;
          }
          .focused_menu {
            font-weight: 600;
            color: #ead196;
          }
        }
        .title {
          position: absolute;
          top: 45%;
          left: 30px;
          .focused_title {
            opacity: 1;
            position: relative;
            h2 {
              margin-bottom: 16px;
              font-weight: 600;
              color: #fff;
            }
            p {
              margin-bottom: 40px;
              font-size: 1.2em;
              font-weight: 300;
              color: #fff;
            }
          }
          .none_title {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
          }
          button {
            height: 46px;
            font-weight: 400;
            font-size: 1em;
            background-color: rgba(0, 0, 0, 0);
            border: 1px solid #fff;
            &:hover {
              background-color: rgba(0, 0, 0, 0.2);
              border: none;
            }
          }
        }
      }
      .filter {
        width: 100%;
        background-color: #fff;
        .search_bar {
          @media only screen and (max-width: 480px) {
            .search_bar {
              width: 90%;
            }
          }
        }

        .type_filter {
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .cover {
      .container {
        padding: 30px 20px;
        .banner {
          ul {
            font-size: 1.6em;
          }
          .title {
            top: auto;
            left: 30px;
            bottom: 30px;
            @media only screen and (max-width: 480px) {
              left: 30px;
              bottom: 200px;
            }
            .focused_title {
              h2 {
                font-size: 3em;
              }
              p {
                font-size: 1.4em;
              }
            }
            button {
              height: 40px;
              font-size: 1.2em;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
  }
`;
const SearchComp = styled.section`
  .container {
    .filter {
      .search_area {
        margin: 100px 0 80px;
        @media only screen and (max-width: 480px) {
          margin: 50px 0 60px;
        }
        .search_bar {
          width: 40%;
          display: flex;
          gap: 10px;
          padding: 10px;
          margin: 0 auto;
          border-bottom: 1px solid var(--BLACK);
          input {
            display: inline-block;
            width: 100%;
            border: none;
            outline: none;
            font-size: 1.1em;
          }

          .search_icon {
            cursor: pointer;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      .filter {
        .search_area {
          .search_bar {
            width: 70%;
            input {
              font-size: 1.3em;
            }
            .search_icon {
              svg {
                font-size: large;
              }
            }
          }
        }
        .type_filter {
          text-align: center;
          margin-bottom: 50px;
        }
      }
    }
  }
`;

const BoardBanner = ({ id, keyword, setKeyword, setIsLoading }) => {
  const navigate = useNavigate();

  // 보드 파라미터에 따라 배너 내용 변화
  const { category, description } = (() => {
    switch (id) {
      case "gather":
        return {
          category: "씨네크루",
          description: "씨네크루, 새로운 친구와의 만남의 장소",
        };
      case "recap":
        return {
          category: "크루후기",
          description: "새로운 사람들과의 경험을 공유해보세요.",
        };
      default:
        return {
          category: "",
          description: "",
        };
    }
  })();

  const onClickMenu = (num) => {
    switch (num) {
      case 1:
        navigate("/board/gather");
        break;
      case 2:
        navigate("/board/recap");
        break;
      default:
        return;
    }
  };

  return (
    <>
      <CineBannerComp
        $imgsrc={category === "씨네크루" ? crewBanner : friendBanner}
      >
        <div className="cover">
          <div className="container">
            <div className="banner">
              <ul>
                <li
                  className={category === "씨네크루" ? "focused_menu" : ""}
                  onClick={() => onClickMenu(1)}
                >
                  씨네크루
                </li>
                <li
                  className={category === "크루후기" ? "focused_menu" : ""}
                  onClick={() => onClickMenu(2)}
                >
                  크루후기
                </li>
              </ul>
              <div className="title">
                <div className="focused_title">
                  <h2>{category}</h2>
                  <p>{description}</p>
                </div>
                <Button
                  clickEvt={() => {
                    navigate(`/board/post/new`);
                  }}
                  active={true}
                  children="글 작성하기"
                  width="110px"
                />
              </div>
            </div>
          </div>
        </div>
      </CineBannerComp>
      <SearchComp>
        <div className="container">
          <div className="filter">
            <div className="search_area">
              <div className="search_bar">
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // 기본 Enter 행동 방지
                      setIsLoading(true);
                    }
                  }}
                />
                <div className="search_icon">
                  <FontAwesomeIcon
                    icon={faSearch}
                    onClick={() => {
                      setIsLoading(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SearchComp>
    </>
  );
};
export default BoardBanner;
