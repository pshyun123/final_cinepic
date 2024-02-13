import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";

const ToTop = styled.div`
  svg {
    padding: 20px;
    position: fixed;
    bottom: 0px;
    right: 0px;
    font-size: 40px;
    z-index: 333;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      color: var(--DARKRED);
      bottom: 10px;
    }
  }
`;

const ScrollToTop = () => {
  const location = useLocation();
  const topRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scrollToTop = () => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToTop();
  }, [location, navigate]);

  const handleScrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={topRef} tabIndex="-1" />
      <ToTop>
        <FontAwesomeIcon icon={faCircleChevronUp} onClick={handleScrollToTop} />
      </ToTop>
    </>
  );
};
export default ScrollToTop;
