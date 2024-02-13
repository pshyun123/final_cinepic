import styled from "styled-components";
import { useState } from "react";
import AgreementModal from "../../util/Agreement/AgreementModal";

const FooterComp = styled.footer`
  width: 100%;
  background-color: #505050;

  .container {
    padding-top: 30px;
    padding-bottom: 80px;
    p,
    div {
      color: white;
    }

    .footer-menu {
      display: flex;
      margin-bottom: 40px;
      li {
        color: #ccc;
        transition: 0.3s ease-in;
        &:hover {
          cursor: pointer;
          color: white;
        }
        &:first-child {
          margin-right: 20px;
          position: relative;

          &::after {
            display: block;
            content: "";
            width: 2px;
            height: 100%;
            background-color: white;
            position: absolute;
            top: 1px;
            right: -11px;
            cursor: default;
          }
        }
      }
    }

    .info {
      line-height: 1.8;
      margin-bottom: 30px;
    }
  }
`;

const Footer = () => {
  // AgreementModal
  const [openAgreement, setAModalOpen] = useState(false);
  const [type, setType] = useState("");
  const openAgree = (agreeType) => {
    setAModalOpen(true);
    setType(agreeType);
  };
  const closeAgree = () => {
    setAModalOpen(false);
  };

  return (
    <>
      <FooterComp>
        <div className="container">
          <ul className="footer-menu">
            <li
              onClick={() => {
                openAgree("use");
              }}
            >
              이용약관
            </li>
            <li
              onClick={() => {
                openAgree("privacy");
              }}
            >
              개인정보 취급방침
            </li>
          </ul>
          <div className="info">
            <p>(주) Cinepic</p>
            <p>김현지 | 박소현 | 이세웅 | 유현주 | 김지은 | 황선영</p>
            <p>주소: 서울특별시 강남구 역삼로</p>
            <p>전화번호 02-123-4567</p>
            <p>이메일 : cinepic2024@google.com</p>
          </div>
          <div className="copyright">
            CopyRight © 2024 Cinepic All Rights Reserved.
          </div>
        </div>
      </FooterComp>

      <AgreementModal open={openAgreement} close={closeAgree} type={type} />
    </>
  );
};
export default Footer;
