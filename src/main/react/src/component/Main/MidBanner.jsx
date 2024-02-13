import styled from "styled-components";
import crew from "../../images/crew.jpg";
import talk from "../../images/talk.jpg";
import space from "../../images/space.jpg";
import { useNavigate } from "react-router-dom";

const MidBannerComp = styled.section`
  background-color: var(--IVORY);
  .container {
    width: 100%;
    .midTitle {
      h3 {
        font-size: 1.5em;
        font-weight: 400;
        /* padding-left: 5%; */
        padding-top: 50px;
        span {
          font-weight: 600;
        }
        @media only screen and (max-width: 768px) {
          padding-left: 8%;
          font-size: 1.9em;
        }
        @media only screen and (max-width: 520px) {
          font-size: 1.5em;
        }
      }
    }
    .funcBtnBox {
      /* border: 1px solid blue; */
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 50px 0 70px 0;
      .funcBtn1 {
        background-image: url(${crew});
      }
      .funcBtn2 {
        background-image: url(${talk});
      }
      .funcBtn3 {
        background-image: url(${space});
      }
      .funcBtn1,
      .funcBtn2,
      .funcBtn3 {
        width: 15%;
        padding-bottom: 15%;
        background-size: cover;
        background-position: center;
        position: relative;
        border-radius: 10px;
        margin: 0 20px;

        .funcText {
          position: absolute;
          text-align: center;
          border-radius: 10px;
          padding-top: 40%;
          background-color: rgba(0, 0, 0, 0.5);
          height: 100%;
          width: 100%;
          font-size: 1.3em;
          font-weight: 600;
          color: white;
          transition: 0.3s ease-in;
          &:hover {
            cursor: pointer;

            background-color: rgba(0, 0, 0, 0.8);
          }
          @media only screen and (max-width: 768px) {
            font-size: 1.4em;
          }
          @media only screen and (max-width: 520px) {
            font-size: 1em;
          }
        }
        @media only screen and (max-width: 900px) {
          width: 20%;
          padding-bottom: 20%;
          margin: 0 10px;
        }
      }
    }
  }
`;

const MidBanner = () => {
  const navigate = useNavigate();
  const toCineCrew = () => {
    navigate("/board/gather");
  };
  const toCineTalk = () => {
    navigate("/chatlist");
  };
  const toIndiSpace = () => {
    navigate("/theater");
  };
  return (
    <>
      <MidBannerComp>
        <div className="container">
          <div className="midTitle">
            <h3>
              <span>씨네픽</span>의 <span>다양한 기능</span>을 확인해보세요!
            </h3>
          </div>
          <div className="funcBtnBox">
            <div className="funcBtn1" onClick={toCineCrew}>
              <div className="funcText">CINE:CREW</div>
            </div>
            <div className="funcBtn2" onClick={toCineTalk}>
              <div className="funcText">CINE:TALK</div>
            </div>
            <div className="funcBtn3" onClick={toIndiSpace}>
              <div className="funcText">INDI:SPACE</div>
            </div>
          </div>
        </div>
      </MidBannerComp>
    </>
  );
};
export default MidBanner;
