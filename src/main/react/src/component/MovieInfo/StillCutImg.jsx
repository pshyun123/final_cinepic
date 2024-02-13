import styled from "styled-components";

const StillImgCump = styled.div`
  .still {
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const StillCutImg = ({ still, handleImageModal }) => {
  return (
    <StillImgCump>
      <div
        className="still"
        onClick={() => {
          handleImageModal(still);
        }}
      >
        <img src={still} alt="stillsImg" />
      </div>
    </StillImgCump>
  );
};
export default StillCutImg;
