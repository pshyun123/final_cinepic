import styled from "styled-components";
import Button from "../../util/Button";

const TabPostComp = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  .viewBox {
    position: relative;
    z-index: 99;
    .img_box {
      width: 100%;
      position: relative;
      padding-bottom: 80%;
    }
    .text_box {
      height: 265px;
      font-size: 1.1em;
      line-height: 1.3;
      padding: 10%;
      position: relative;
      @media only screen and (max-width: 768px) {
        font-size: 1.3em;
      }
      @media only screen and (max-width: 480px) {
      }
    }
    p:nth-child(1) {
      margin-bottom: 15%;
      color: var(--ORANGE);
    }
    p:nth-child(2) {
      margin-bottom: 12%;
      line-height: 1.3;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    p:nth-child(3) {
      margin-bottom: 20%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    p:nth-child(4) {
      color: var(--GREY);
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
    button {
      border: 1px solid var(--GREY);
      color: var(--GREY);
      transition: all 0.3s;

      position: absolute;
      left: 20px;
      bottom: 20px;
      z-index: 9999;
      &:hover {
        border: 1px solid var(--ORANGE);
        color: var(--ORANGE);
      }
      @media only screen and (max-width: 768px) {
        font-size: 1em;
      }
      @media only screen and (max-width: 480px) {
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .text_box {
      /* height: 200px; */
      font-size: 1.3em;

      button {
        font-size: 1em;
      }
    }
  }
`;
const PostImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$postImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
`;

const TabPost = ({ post, revise, userAlias }) => {
  const toDate = new Date(post.postRegDate);
  const regDate = toDate.toISOString().split("T")[0];

  const handleViewBoxClick = () => {
    revise(
      "view",
      post.postImage,
      post.postTitle,
      post.postContent,
      post.postId,
      post.alias
    );
  };

  return (
    <>
      <TabPostComp>
        <div className="viewBox" onClick={handleViewBoxClick}>
          <div className="img_box">
            <PostImg $postImage={post.postImage}></PostImg>
          </div>
          <div className="text_box">
            <p>{post.alias}</p>
            <p>{post.postTitle}</p>
            <p>{post.postContent}</p>
            <p>{regDate}</p>
          </div>
        </div>
      </TabPostComp>
    </>
  );
};
export default TabPost;
