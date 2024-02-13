import { styled } from "styled-components";
import theaterBg from "../../images/theaterBanner.jpeg";

const TheaterBannerComp = styled.section`
  width: 100%;
  height: 350px;
  background-image: url(${theaterBg});
  background-size: contain;
  background-position: center 10%;
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .container {
      padding-top: 120px;
      text-align: center;
      h1 {
        font-size: 2.2em;
        font-weight: 600;
        margin-bottom: 40px;
        color: #fff;
      }
      p {
        font-size: 1.2em;
        color: #fff;
      }
    }
  }
`;

const TheaterBanner = () => {
  return (
    <>
      <TheaterBannerComp>
        <div className="wrapper">
          <div className="container">
            <h1>독립,예술 영화관 찾기</h1>
            <p>영화관 위치를 찾고 싶다면 검색해 보세요!</p>
          </div>
        </div>
      </TheaterBannerComp>
    </>
  );
};

export default TheaterBanner;
