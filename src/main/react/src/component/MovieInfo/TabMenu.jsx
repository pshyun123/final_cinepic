import { useState } from "react";
import styled from "styled-components";
import TabInfo from "./TabInfo";
import TabActor from "./TabActor";
import TabStillCut from "./TabStillCut";
import TabPostSlide from "./TabPostSlide";

const TabMenuComp = styled.section`
  padding: 5% 0 0;

  .container {
    padding: 0;
    border-bottom: 1px solid var(--ORANGE);
    ul {
      display: flex;
      /* padding: 0 10px; */
      li {
        width: calc(100% / 4);
        border-bottom: 1px solid var(--ORANGE);
        font-size: 1.3em;
        text-align: center;
        padding: 2% 5%;
        cursor: pointer;
        @media only screen and (max-width: 480px) {
          padding: 3% 4%;
        }
      }
      .focused {
        color: var(--ORANGE);
        border: 1px solid var(--ORANGE);
        border-bottom: none;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .container {
      ul {
        li {
          letter-spacing: -1px;
          font-size: 1em;
        }
      }
    }
  }
`;

const TabMenu = ({
  movieId,
  movieDetail,
  userImage,
  userAlias,
  handleImageModal,
}) => {
  const [currentTab, setTab] = useState(0);

  return (
    <>
      <TabMenuComp>
        <div className="container">
          <ul>
            <li
              onClick={() => {
                setTab(0);
              }}
              className={currentTab === 0 ? "focused" : ""}
            >
              주요 정보
            </li>
            <li
              onClick={() => {
                setTab(1);
              }}
              className={currentTab === 1 ? "focused" : ""}
            >
              감독 / 배우
            </li>
            <li
              onClick={() => {
                setTab(2);
              }}
              className={currentTab === 2 ? "focused" : ""}
            >
              스틸 컷
            </li>
            <li
              onClick={() => {
                setTab(3);
              }}
              className={currentTab === 3 ? "focused" : ""}
            >
              씨네포스트
            </li>
          </ul>
          {currentTab === 0 && <TabInfo movieDetail={movieDetail} />}
          {currentTab === 1 && <TabActor movieDetail={movieDetail} />}
          {currentTab === 2 && (
            <TabStillCut
              movieDetail={movieDetail}
              handleImageModal={handleImageModal}
            />
          )}
          {currentTab === 3 && (
            <TabPostSlide
              movieId={movieId}
              movieDetail={movieDetail}
              userImage={userImage}
              userAlias={userAlias}
            />
          )}
        </div>
      </TabMenuComp>
    </>
  );
};
export default TabMenu;
