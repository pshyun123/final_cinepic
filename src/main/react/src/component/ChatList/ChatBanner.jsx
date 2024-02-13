import { styled } from "styled-components";
import bannerPc from "../../images/chatList_bg_pc.jpg";
import bannerMo from "../../images/chatList_bg_mo.jpg";

const ChatBannerComp = styled.section`
  width: 100%;
  height: 350px;
  background-image: url(${bannerPc});
  background-size: cover;
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

const ChatBanner = () => {
  return (
    <>
      <ChatBannerComp>
        <div className="wrapper">
          <div className="container">
            <h1>씨네톡</h1>
            <p>실시간으로 취향이 맞는 영화친구들을 찾아 대화해 보세요</p>
          </div>
        </div>
      </ChatBannerComp>
    </>
  );
};
export default ChatBanner;
