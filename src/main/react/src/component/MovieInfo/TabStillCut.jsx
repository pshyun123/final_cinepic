import styled from "styled-components";
import StillCutImg from "./StillCutImg";

const StillCutComp = styled.div`
  padding: 70px 10px;
  .stil_container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    .movieStill {
    }
    .noStillMsg {
      color: black;
      font-size: 1.4em;
      margin-bottom: 40px;
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 50px 0;
    .stil_container {
      grid-template-columns: repeat(2, 1fr);
      /* gap: 10px; */
    }
  }
`;

const TabStillCut = ({ movieDetail, handleImageModal }) => {
  const stills = movieDetail.movieStills
    ? movieDetail.movieStills.split("|")
    : [];

  return (
    <StillCutComp>
      <div className="stil_container">
        {stills.length > 0 ? (
          stills.map((still, index) => (
            <StillCutImg
              className="movieStill"
              key={index}
              still={still}
              handleImageModal={handleImageModal}
            />
          ))
        ) : (
          <p className="noStillMsg">스틸 컷 정보가 없습니다.</p>
        )}
      </div>
    </StillCutComp>
  );
};
export default TabStillCut;
