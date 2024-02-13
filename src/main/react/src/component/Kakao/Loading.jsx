import { styled } from "styled-components";
import logo from "../../images/cinepic_logo.png";

const LoadingComp = styled.section`
  width: 100;
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 70vh;

    .logo {
      width: 110px;
    }
    h2 {
      padding-top: 20px;
      font-size: 1.7em;
      font-weight: 600;
      text-align: center;
      color: var(--BLACK);
    }
  }
  @media only screen and (max-width: 480px) {
    .container {
      flex-direction: column;
      justify-content: center;
      .logo {
        width: 80px;
      }
      h2 {
        font-size: 1.4em;
      }
    }
  }
`;

const Loading = () => {
  return (
    <>
      <LoadingComp>
        <div className="container">
          <img className="logo" src={logo} alt="logo" />
          <div className="LoadingBox">
            <h2>로그인 중입니다</h2>
          </div>
        </div>
      </LoadingComp>
    </>
  );
};

export default Loading;
