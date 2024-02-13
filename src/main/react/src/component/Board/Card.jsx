import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardComp = styled.section`
  padding: 0 20px;

  .card_container {
    display: flex;
    gap: 30px;
    padding: 30px 0;
    border-bottom: 1px solid var(--GREY);
    /* background-color: pink; */
    cursor: pointer;
    .img_box {
      width: 26%;
      min-width: 230px;
      border-radius: 5px;
      overflow: hidden;
    }
    .text_box {
      width: calc(100% - 26% - 30px - (20px - 20px) - 30px);
      position: relative;
      padding-top: 20px;
      .date {
        text-align: right;
        color: var(--GREY);

        position: absolute;
        top: -10px;
        right: 0;
      }
      .title {
        font-weight: 700;
        font-size: 1.4em;
        margin-bottom: 26px;
        line-height: normal;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .text_area {
        margin-bottom: 20px;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .count {
        color: var(--GREY);
        position: absolute;
        bottom: 10px;
        left: 0;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 0;
    .card_container {
      display: block;
      height: auto;
      padding: 10px 0;
      .img_box {
        width: 100%;
        border-radius: 0;
        margin-bottom: 10px;
      }
      .text_box {
        width: 100%;
        padding-top: 6px;
        padding-bottom: 20px;
        .date {
          font-size: 1.3em;
          top: auto;
          right: 0;
          bottom: 0;
          @media only screen and (max-width: 480px) {
            font-size: 1em;
          }
        }
        .title {
          font-weight: 600;
          font-size: 1.5em;
          @media only screen and (max-width: 480px) {
            font-size: 1.1em;
          }
        }
        .text_area {
          display: none;
        }
        .count {
          text-align: right;
          font-size: 1.3em;
          bottom: 0;
          left: 0;
          @media only screen and (max-width: 480px) {
            font-size: 1em;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
  }
`;
const ImgComp = styled.div`
  /* width: 100%; */
  height: 100%;
  min-height: 200px;
  padding-bottom: 70%;
  background-image: url(${(props) => props.$imgsrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Card = ({ data }) => {
  const navigate = useNavigate();
  const toDate = new Date(data.regDate);
  const regDate = toDate.toISOString().split("T")[0];

  return (
    <>
      <CardComp>
        <div
          className="card_container"
          onClick={() => {
            navigate(`/board/post/${data.id}`);
          }}
        >
          <div className="img_box">
            <ImgComp $imgsrc={data.image} />
          </div>
          <div className="text_box">
            <p className="date">{regDate}</p>
            <p className="title">{data.title}</p>
            <div className="text_area">
              {data.boardContent.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <p className="count">조회수 {data.count}</p>
          </div>
        </div>
      </CardComp>
    </>
  );
};
export default Card;
