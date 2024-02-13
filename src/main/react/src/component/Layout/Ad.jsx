import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adImg from "../../images/ad_banner.jpg";
import logo from "../../images/cinepic_logo.png";
import Modal from "../../util/Modal";

const AdComp = styled.section`
  width: 100%;
  background-image: url(${adImg});
  background-position: center;
  position: sticky;
  bottom: 0;
  z-index: 300;
  .container {
    /* border: 1px solid blue; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    .adBox {
      padding: 5% 0;
      p {
        color: white;
        font-size: 1.3em;
      }
      @media only screen and (max-width: 768px) {
        padding: 20px;
        p {
          font-size: 1.3em;
        }
      }
      @media only screen and (max-width: 600px) {
        padding: 20px;
        p {
          font-size: 1em;
        }
      }
    }
  }
  .imgWrap {
    transform: rotate(-30deg);
    opacity: 15%;
    position: absolute;
    right: 5%;
    .logoImg {
      width: 90%;
    }
  }
  &:hover {
    cursor: pointer;
    transition: 0.3s ease-in;
  }
`;

const Ad = ({ isLogin }) => {
  const navigate = useNavigate();
  const toPayment = () => {
    if (isLogin) {
      navigate("/Payment");
    } else {
      handleModal(
        "로그인",
        "로그인이 필요한 기능입니다. \n 로그인 하시겠습니까?",
        true
      );
    }
  };

  // 팝업
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);
  // 팝업으로 이동조건 하나일 경우
  const closeModal = (num) => {
    setModalOpen(false);
  };

  const handleModal = (header, msg, type, num) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };
  return (
    <>
      <AdComp onClick={toPayment}>
        <div className="container">
          <div className="adBox">
            <p>
              멤버십에 가입하고 광고 없는 편안한 환경에서 씨네픽을 즐겨보세요!
            </p>
          </div>
          <div className="imgWrap">
            <img className="logoImg" src={logo} alt="logoImg" />
          </div>
        </div>
      </AdComp>
      <Modal
        open={openModal}
        close={closeModal}
        header={modalHeader}
        children={modalMsg}
        type={modalType}
        confirm={() => {
          navigate("/login");
          closeModal();
        }}
      />
    </>
  );
};
export default Ad;
