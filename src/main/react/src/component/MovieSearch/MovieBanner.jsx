import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import movieSearchBanner from "../../images/movieSearch.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const MovieBannerComp = styled.section`
  width: 100%;
  height: 630px;
  background-image: url(${movieSearchBanner});
  background-size: cover;
  background-position: center;
  .container {
    width: 100%;
    height: 100%;
    line-height: 50px;
    .banner {
      width: 100%;
      height: 550px;
      position: relative;
      h1 {
        font-size: 2.3em;
        font-weight: 600;
        color: #fff;
      }
      p {
        font-size: 1.2em;
        color: #fff;
        font-weight: 300;
      }
      .title {
        position: absolute;
        top: 45%;
        left: 25px;
      }
    }
  }
`;

const SearchComp = styled.section`
  .container {
    .movieSearch {
      margin: 100px 0;
      .searchBar {
        display: flex;
        margin: 0 auto;
        gap: 10px;
        padding: 10px;
        width: 40%;
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
  @media screen and (max-width: 480px) {
    .container {
      .movieSearch {
        .searchBar {
          width: 70%;
          input {
            font-size: 1.3em;
          }
          .search_icon {
            font-size: large;
          }
        }
      }
    }
  }
`;

const MovieBanner = ({ setKeyword, setSortBy, searchCompRef }) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    console.log("검색어 변화 : " + searchInput);
  }, [searchInput]);
  useEffect(() => {
    console.log("렌더링!");
  }, []);

  return (
    <>
      <MovieBannerComp>
        <div className="container">
          <div className="banner">
            <div className="title">
              <h1>영화검색</h1>
              <p ref={searchCompRef}>보고 싶은 영화를 검색해 보세요.</p>
            </div>
          </div>
        </div>
      </MovieBannerComp>
      <SearchComp>
        <div className="container">
          <div className="movieSearch">
            <div className="searchBar">
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // 기본 Enter 행동 방지
                    setKeyword(searchInput);
                    if (searchInput === "") {
                      setSortBy("recent");
                    } else {
                      setSortBy("relevant");
                    }
                  }
                }}
              />
              <div className="search_icon">
                <FontAwesomeIcon
                  icon={faSearch}
                  onClick={() => {
                    setKeyword(searchInput);
                    if (searchInput === "") {
                      setSortBy("recent");
                    } else {
                      setSortBy("relevant");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </SearchComp>
    </>
  );
};

export default MovieBanner;
