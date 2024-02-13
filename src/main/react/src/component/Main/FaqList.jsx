import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import FaqApi from "../../api/FaqApi";
import { useEffect, useState } from "react";

const FaqListComp = styled.section`
  background-color: white;
  .container {
    padding: 60px 0;
    padding-bottom: 130px;
    .faqHeader {
      margin-bottom: 40px;
      h3 {
        font-size: 1.5rem;
        font-weight: 600;
        /* padding-left: 5%; */
      }
    }
    .faqMap {
      width: 90%;
      margin: 0 auto;
      font-size: 1.3rem;
      cursor: pointer;

      li {
        position: relative;
        border-radius: 5px;
        background-color: rgba(204, 204, 204, 0.3);
        padding: 18px;
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 10px;

        .faqBox {
          display: flex;

          .title {
            color: var(--DARKGREY);
            padding-left: 10px;
          }
        }
        .toggle {
          transition: 0.4s ease-in;
          overflow: hidden;
          height: 0;
          padding: 0;

          line-height: 1.6;
          font-size: 0.8em;
          &.active {
            overflow: visible;
            height: auto;
            padding-top: 20px;
          }
          p {
            margin: 0 auto;
            width: 100%;
            color: var(--DARKGREY);
            padding: 10px;
            font-weight: 400;
            white-space: pre-wrap;
          }
        }

        svg {
          color: var(--DARKGREY);
          position: absolute;
          top: 3px;
          right: 0;
          padding: 18px;
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .container {
      .faqHeader {
        margin-bottom: 40px;
        h3 {
          font-size: 1.5em;
        }
      }
      .faqMap {
        width: 95%;
        li {
          font-size: 0.7em;
          .faqBox {
            .title {
              color: var(--DARKGREY);
              padding-left: 0px;
            }
          }
        }
      }
    }
  }
`;

const Faq = ({ faqPlus }) => {
  const [icon, setIcon] = useState(faAngleDown);
  const [active, setActive] = useState("");

  const onClick = () => {
    icon === faAngleDown ? setIcon(faAngleUp) : setIcon(faAngleDown);
    active === "" ? setActive("active") : setActive("");
  };
  return (
    <>
      <li onClick={onClick}>
        <div className="faqBox">
          <div className="title">{faqPlus.faqQuestion}</div>
        </div>

        <div className={`toggle ${active}`}>
          <p>{faqPlus.faqAnswer}</p>
        </div>
        <FontAwesomeIcon icon={icon} />
      </li>
    </>
  );
};

const FaqList = () => {
  const [faqData, setFaqData] = useState([]);

  // faq 리스트 불러오기
  const fetchFaqList = async () => {
    try {
      const res = await FaqApi.getMainFaq();
      if (res.data !== null) {
        setFaqData(res.data);
        console.log("Faq리스트 가져옴");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFaqList();
  }, []);

  return (
    <>
      <FaqListComp>
        <div className="container">
          <div className="faqHeader">
            <h3>FAQ</h3>
          </div>
          <ul className="faqMap">
            {faqData &&
              faqData.map((faq) => (
                <Faq key={faq.faqQuestion} faqPlus={faq} isNotice={false} />
              ))}
          </ul>
        </div>
      </FaqListComp>
    </>
  );
};

export default FaqList;
