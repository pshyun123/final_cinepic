import { styled } from "styled-components";
import Button from "../util/Button";
import { useNavigate } from "react-router-dom";

const NotFoundComp = styled.section`
  width: 100%;

  .container {
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    height: 80vh;

    .ErrorBox {
      text-align: center;
      margin-top: 100px;
      margin-bottom: 50px;
      h2 {
        font-size: 2.2em;
        font-weight: 600;
        margin-bottom: 40px;
        span {
          color: red;
          font-weight: 800;
          margin-right: 5px;
        }
      }
      p {
        margin-top: 10px;
        line-height: 1.4;
        font-size: 20px;
      }
    }
    .buttonBox {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const toMain = () => {
    navigate("/");
  };
  return (
    <>
      <NotFoundComp>
        <div className="container">
          <div className="ErrorBox">
            <h2>
              <span>404</span>Not Found
            </h2>
            <p>페이지를 찾을 수 없습니다</p>
            <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
            <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
          </div>
          <div className="buttonBox">
            <Button
              children="홈으로"
              active={true}
              width="90px"
              clickEvt={toMain}
            />
          </div>
        </div>
      </NotFoundComp>
    </>
  );
};
export default NotFound;
