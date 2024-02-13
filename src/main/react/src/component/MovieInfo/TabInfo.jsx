import styled from "styled-components";

const TabInfoComp = styled.div`
  padding: 5%;
  p {
    line-height: 3em;
    font-size: 1.1em;
  }
  @media only screen and (max-width: 768px) {
    p {
      line-height: 2.5em;
      font-size: 1.3em;
    }
  }
`;

const TabInfo = ({ movieDetail }) => {
  return (
    <>
      <TabInfoComp>
        <p>{movieDetail.moviePlot}</p>
      </TabInfoComp>
    </>
  );
};
export default TabInfo;
