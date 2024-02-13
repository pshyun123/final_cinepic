import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../util/Button";
import Logo from "../../images/cinepic_logo.png";

const MembershipJoinComp = styled.section`
  width: 100%;

  background-color: var(--DARKRED);
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 80px; // 북마크와의 간격
  overflow: hidden;

  .container {
    position: relative;
    display: flex;
    align-items: center;
    height: 300px;

    .adWrap {
      .ad {
        p {
          text-align: center;
          font-size: 1.9em;
          font-weight: 400;
          color: var(--IVORY);
        }
        margin-bottom: 30px;
      }
      .buttonBox {
        button {
          display: block;
          margin: 0 auto;
          font-size: 1.2em;
        }
      }
    }
    .imgWrap {
      transform: rotate(-20deg) scale(2.4);
      position: absolute;
      right: 10%;
      opacity: 0.2; // 로고 투명도 조절
    }
    @media (max-width: 768px) {
      .container {
        height: 600px;
      }
      .adWrap {
        padding-top: 60px;
        width: 100%;
        align-items: baseline;
        .ad {
          p {
            font-size: 1.6em;
            font-weight: 600;
            color: var(--IVORY);
          }
        }
        .buttonBox {
          button {
            font-size: 1.2em;
          }
        }
      }
      .imgWrap {
        width: 100%;
        top: 20px;
        left: 0;
        display: flex;
        order: -1;
        justify-content: center;
        align-items: center;
        transform: rotate(-20deg) scale(0.5);
      }
    }
  }
`;

const MembershipJoin = () => {
  const navigate = useNavigate();

  const toPayment = () => {
    navigate("/Payment");
  };

  return (
    <MembershipJoinComp>
      <div className="container">
        <div className="adWrap">
          <div className="ad">
            <p>단 한번의 가입으로 광고없이 쾌적하게!</p>
          </div>
          <div className="buttonBox">
            <Button
              children="가입하기"
              active={true}
              clickEvt={toPayment}
              front={"var(--IVORY)"}
              back={"var(--ORANGE)"}
              color={"var(--RED)"}
              width={"100px"}
            />
          </div>
        </div>
        <div className="imgWrap">
          <img className="LogoIcon" src={Logo} alt="LogoIcon" />
        </div>
      </div>
    </MembershipJoinComp>
  );
};

export default MembershipJoin;
