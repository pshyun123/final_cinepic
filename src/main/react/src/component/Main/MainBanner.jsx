import styled from "styled-components";
import mainImg from "../../images/3.jpg";
const MainBannerComp = styled.section`
  width: 100%;
  height: 500px;
  background-image: url(${mainImg});
  background-size: cover;
  background-position: center;
  .sectionWrapper {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    .container {
      width: 100%;
      .textBox {
        padding: 100px 0;

        h4 {
          color: var(--IVORY);
          font-size: 1.2em;
          margin-bottom: 20px;
        }
        h2 {
          color: var(--IVORY);
          font-weight: 600;
        }
      }
      @media only screen and (max-width: 768px) {
        .textBox {
          padding: 100px 70px;
          h4 {
            font-size: 1em;
          }
          h2 {
            font-size: 2.4em;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    height: 400px;
  }
  @media only screen and (max-width: 480px) {
    height: 300px;
    .sectionWrapper {
      .container {
        .textBox {
          padding: 60px;
        }
      }
    }
  }
`;

const MainBanner = () => {
  return (
    <>
      <MainBannerComp>
        <div className="sectionWrapper">
          <div className="container">
            <div className="textBox">
              <h4>당신만을 위한 완벽한 영화 추천</h4>
              <h2>CINEPIC</h2>
            </div>
          </div>
        </div>
      </MainBannerComp>
    </>
  );
};
export default MainBanner;
