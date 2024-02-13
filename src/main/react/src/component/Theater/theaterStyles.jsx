import { styled } from "styled-components";

const TheaterComp = styled.section`
  // 지도 전체 감싸는 영역
  .container {
    // 제목
    h2 {
      display: flex;
      padding-left: 10%;
      font-size: 1.3em;
      padding-top: 7%;
      font-weight: 600;
      .titleIcon {
        margin-right: 15px;
        color: var(--DARKRED);
      }
    }

    // 지도 영역
    .mapContainer {
      width: 80%;
      height: 500px;
      margin: 40px auto;
    }
    // 검색바 감싸는 영역
    .searchContainer {
      margin-bottom: 30px;
      height: 30px;
      .inputWapper {
        text-align: right;
        font-size: 1.2em;
        width: 80%;
        margin: 0 auto;
        position: relative;
        // 검색창&돋보기 아이콘
        .searchBox {
          position: absolute;
          right: 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--BLACK);
          // 검색창
          input {
            text-align: left;
            font-size: 1em;
            border: none;
            outline: none;
            margin-right: 10px;
          }
          // 아이콘
          svg {
            cursor: pointer;
          }
        }
      }
    }
    // 정보박스 전체 영역
    .infoContainer {
      border: 1px solid var(--BLACK);
      padding: 40px;
      margin: 50px auto;
      width: 80%;
      border-radius: 5px;

      // 상영관 이름
      h3 {
        margin-bottom: 40px;
        font-size: 1.2em;
        font-weight: 600;
      }
      // 기본정보 박스 영역
      .basicInfo1 {
        margin-bottom: 40px;
        // 기본정보 제목
        h3 {
          font-size: 1.1em;
          color: var(--DARKGREY);
          margin: 0 0 5% 1%;
          position: relative;
          font-weight: 600;
          padding-left: 5px;
          &::before {
            content: "";
            width: 3px;
            height: 100%;
            position: absolute;
            top: 0;
            left: -8px;
            background-color: var(--RED);
          }
        }
        // 박스 안에 내용
        .content1 {
          border: 1px solid var(--BLACK);
          border-radius: 5px;
          padding: 30px;
          div {
            display: flex;
            flex-direction: row;
            font-size: 0.9em;
            .title {
              display: inline-block;
              width: 100px;
              margin-right: 15px;
              position: relative;
              font-weight: 600;
              &::after {
                display: block;
                content: "";
                width: 2px;
                height: 50%;
                background-color: var(--GREY);
                position: absolute;
                top: 25%;
                right: 0;
              }
            }
            span {
              display: inline-block;
              width: 85%;
              line-height: 2.6em;
            }
          }
        }
      }
      // 스크린관 정보 박스 영역
      .basicInfo2 {
        // 스크린관 정보 제목
        h3 {
          color: var(--DARKGREY);
          margin: 0 0 5% 1%;
          position: relative;
          font-size: 1.1em;
          font-weight: 600;
          padding-left: 5px;
          &::before {
            content: "";
            width: 3px;
            height: 100%;
            background-color: var(--RED);
            position: absolute;
            top: 0;
            left: -8px;
          }
        }
        // 스크린관 정보 내용
        .content2 {
          border: 1px solid var(--BLACK);
          border-radius: 5px;
          display: grid;
          grid-template-columns: 50% 50%;
          grid-template-rows: 20% 20% 20% 20%;
          gap: 5%;
          padding: 25px 10px;
          div {
            font-size: 0.9em;
            .title {
              width: 120px;
              display: inline-block;
              position: relative;
              font-weight: 600;
              &::after {
                display: block;
                content: "";
                width: 2px;
                height: 50%;
                background-color: var(--GREY);
                position: absolute;
                top: 25%;
                right: 0;
              }
            }
            span {
              display: inline-block;
              width: 50px;
              margin-left: 20px;
              line-height: 2.5em;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .container {
      // 제목
      h2 {
        font-size: 1.8em;
        padding-left: 15px;
        .titleIcon {
          &::before {
            height: 22%;
            top: 80%;
          }
        }
      }
      // 지도 영역
      .mapContainer {
        margin-top: 40px;
        width: 95%;
      }
      .searchContainer {
        margin-left: 70%;
      }
      // 정보박스 전체 영역
      .infoContainer {
        width: 95%;
        // 기본정보 박스 영역
        h3 {
          font-size: 1.6em;
        }
        .basicInfo1 {
          // 기본정보 제목
          h3 {
            font-size: 1.5em;
            font-weight: 600;
          }
          // 박스 안에 내용
          .content1 {
            div {
              font-size: 1.2em;
              .title {
                text-align: left;
                width: 70px;
                &::after {
                  display: none;
                }
              }
              span {
                text-align: right;
                &.address {
                  line-height: 2;
                }
              }
            }
          }
        }
        // 스크린관 정보 박스 영역
        .basicInfo2 {
          // 스크린관 정보 제목
          h3 {
            font-size: 1.5em;
            font-weight: 600;
          }
          // 스크린관 정보 내용
          .content2 {
            grid-template-columns: 100%;
            grid-template-rows: repeat(7, 13%);
            gap: 1.5%;
            padding: 25px 30px;
            div {
              width: 100%;
              display: flex;
              justify-content: space-between;
              padding-right: 0;
              font-size: 1.2em;
              .title {
                margin: 0;
                &::after {
                  display: none;
                }
              }
              .element {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    .container {
      // 정보박스 전체 영역
      h2 {
        font-size: 1.5em;
      }
      // 지도 영역
      .mapContainer {
        height: 400px;
      }
      .searchContainer {
        margin-left: 60%;
      }
      .infoContainer {
        h3 {
          font-size: 1.4em;
        }
        // 기본정보 박스 영역
        .basicInfo1 {
          // 박스 안에 내용
          h3 {
            font-size: 1.3em;
            font-weight: 600;
          }
          .content1 {
            div {
              font-size: 1.1em;
            }
          }
        }
        // 스크린관 정보 박스 영역
        .basicInfo2 {
          // 스크린관 정보 내용
          h3 {
            font-size: 1.3em;
            font-weight: 600;
          }
          .content2 {
            div {
              font-size: 1.1em;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    .container {
      // 정보박스 전체 영역
      h2 {
        font-size: 1.4em;
      }
      // 지도 영역
      .mapContainer {
        height: 300px;
      }
      .infoContainer {
        padding: 30px;
        // 기본정보 박스 영역
        h3 {
          font-size: 1.3em;
        }
        .basicInfo1 {
          // 박스 안에 내용
          h3 {
            font-size: 1.2em;
          }
          .content1 {
            padding: 20px;
            div {
              font-size: 1em;
            }
          }
        }
        // 스크린관 정보 박스 영역
        .basicInfo2 {
          // 스크린관 정보 제목
          h3 {
            font-size: 1.2em;
          }
          // 스크린관 정보 내용
          .content2 {
            div {
              .title {
                text-align: left;
                &::after {
                  display: none;
                }
              }
              span {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
`;

export default TheaterComp;
