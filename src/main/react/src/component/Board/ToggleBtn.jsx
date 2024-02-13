import styled, { css } from "styled-components";
import React, { useState, useEffect } from "react";

const ToggleBtn = styled.button`
  width: 24%;
  border-radius: 5px;
  padding: 10px 5px;
  overflow: hidden;
  background-color: white;
  border: none;
  box-shadow: 8px 6px 10px -3px rgba(0, 0, 0, 0.1),
    0 10px 10px rgba(0, 0, 0, 0.1);

  position: relative;
  transition: all 0.5s ease;
  cursor: pointer;
  .btnBox {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  @media only screen and (max-width: 768px) {
    width: 40%;
  }
`;

const BtnText = styled.div`
  width: 50%;
  z-index: 5;
  color: ${(props) => (props.$toggle === !true ? "#fff" : "var(--BLACK)")};
  font-size: 15px;
  font-weight: 500;
  transition: all 0.5s ease;
  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const Circle = styled.div`
  background-color: var(--BLACK);
  width: 49%;
  height: 90%;
  border-radius: 5px;
  position: absolute;
  left: 1%;
  top: 6%;
  transition: all 0.8s ease;
  ${(props) =>
    props.$toggle === false &&
    css`
      transform: translate(100%, 0);
    `}
`;

const ToggleButton = React.memo(
  ({ onChange, gatherType }) => {
    const [toggle, setToggle] = useState(true);

    // console.log("토글버튼");

    const clickedToggle = () => {
      setToggle(toggle ? false : true);
      gatherType === "온라인" ? onChange("오프라인") : onChange("온라인");
    };

    useEffect(() => {
      if (gatherType === "온라인") {
        setToggle(true);
      } else if (gatherType === "오프라인") {
        setToggle(false);
      }
    }, [gatherType]);

    return (
      <>
        <ToggleBtn onClick={clickedToggle}>
          <div className="btnBox">
            <BtnText $toggle={!toggle}>온라인</BtnText>
            <BtnText $toggle={toggle}>오프라인</BtnText>
          </div>
          <Circle $toggle={toggle} />
        </ToggleBtn>
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.gatherType === nextProps.gatherType &&
    prevProps.toggle === nextProps.toggle
);

export default ToggleButton;
