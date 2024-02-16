import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPen,
  faCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import MovieDetailApi from "../../api/MovieDetailApi";
import useTokenAxios from "../../hooks/useTokenAxios";

const ComtComp = styled.div`
  padding-bottom: 5%;
  display: flex;

  .user_box {
    width: 120px;
    text-align: center;
    padding: 22px 10px;
    .img_box {
      width: 70%;
      padding-bottom: 70%;
      margin-bottom: 10%;
      display: inline-block;

      border-radius: 50%;
      overflow: hidden;
      background-color: var(--GREY);
      position: relative;

      svg {
        width: 80%;
        height: 80%;
        position: absolute;
        top: 20%;
        left: 10%;
        color: var(--DARKGREY);
      }
    }
  }
  .input_box {
    width: calc(100% - 120px);
    border-radius: 10px;
    border: 1px solid var(--GREY);
    display: flex;
    align-items: center;
    font-size: 1.1em;

    position: relative;
    .icon_box {
      display: flex;
      gap: 16px;
      color: var(--GREY);
      opacity: 0.8;

      position: absolute;
      top: 16px;
      right: 18px;
      .modify,
      .delete,
      .check {
        transition: all 0.5s;
      }
      .modify:hover,
      .check:hover {
        cursor: pointer;
        color: var(--ORANGE);
      }
      .delete:hover {
        cursor: pointer;
        color: var(--BLACK);
      }
    }
    .select_box {
      padding: 16px;
      min-width: 180px;
      line-height: 36px;

      display: flex;
      justify-content: center;
      gap: 30px;
      label:nth-child(1) {
        padding-top: 2px;
      }
      label {
        select {
          font-size: 0.9em;
          border-style: none;
        }
        select[disabled] {
          /* 화살표를 없애는 스타일 */
          -webkit-appearance: none; /* Safari 및 Chrome 등 Webkit 기반 브라우저에서 사용 */
          -moz-appearance: none; /* Firefox에서 사용 */
          appearance: none; /* 일반적인 경우에 적용 */
          color: var(--BLACK);
          font-size: 1.1em;
        }
      }
      .num {
        font-size: 1.5em;
        font-weight: 900;
        select[disabled] {
          font-size: 1.1em;
          font-weight: 700;
        }
      }
    }
    .bar {
      width: 1px;
      height: 60%;
      background-color: var(--ORANGE);
    }
    .comment {
      width: 100%;
      /* margin: 40px 20px; */
      line-height: 26px;
      height: auto;
      margin: 20px;
      border: none;

      resize: none;
      font-size: 1em;
      font-family: "Noto Sans KR", sans-serif;
      &:focus {
        outline: none;
      }
    }
    .P_comment {
      width: 100%;
      display: inline;
      line-height: 26px;
      font-size: 1em;
      margin: 40px 20px;
    }
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.1em;
    .user_box {
      width: 80px;
      padding: 0;
      font-size: 1.1em;
    }
    .input_box {
      width: calc(100% - 80px);
      display: block;
      padding: 2% 3% 4% 3%;
      .icon_box {
        top: 22px;
        right: 18px;
        @media only screen and (max-width: 480px) {
          top: 18px;
          right: 18px;
        }
        .modify {
          font-size: 16px;
        }
        .delete {
          font-size: 18px;
        }
      }
      .select_box {
        padding: 0px 16px 8px 10px;
        justify-content: flex-start;
        gap: 16px;

        label {
          select[disabled] {
            @media only screen and (max-width: 480px) {
              font-size: 0.9em;
            }
          }
        }
        .num {
          select[disabled] {
            @media only screen and (max-width: 480px) {
              font-size: 0.9em;
            }
          }
        }
      }
      .bar {
        width: 100%;
        height: 1px;
        margin: 0 auto;
        margin-bottom: 10px;
      }
      .comment {
        width: 100%;
        margin: 0;
        padding: 20px 0;
        margin-bottom: 3%;
        text-align: left;
        font-size: 1.1em;
      }
      .P_comment {
        margin: 0;
        line-height: 1.5;
      }
    }
  }
  @media only screen and (max-width: 480px) {
  }
`;
const ComtImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$comtImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
`;

const Comt = (props) => {
  const { handleModal, comt, userAlias, fetchPage, setEditId } = props;
  const [isRevice, setIsRevice] = useState(false);
  const [editField, setEditField] = useState(comt.ratingField);
  const [editNum, setEditNum] = useState(comt.ratingNum);
  const [editText, setEditText] = useState(comt.ratingText);

  // 수정
  const commentModify = async () => {
    // console.log("관람평 수정 전");
    const res = await MovieDetailApi.modifyMovieComment(
      comt.commentId,
      editField,
      editNum,
      editText
    );
    // console.log("commentId : " + comt.commentId);
    if (res.data !== null) {
      // console.log("관람평 수정 성공");
      fetchPage();
    }
  };
  const modiComment = useTokenAxios(commentModify);

  return (
    <>
      <ComtComp>
        <div className="user_box">
          <div className="img_box">
            {comt.image ? (
              <ComtImg $comtImg={comt.image}></ComtImg>
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </div>
          <p>{comt.alias}</p>
        </div>

        <div className="input_box">
          {userAlias && userAlias === comt.alias && (
            <div className="icon_box">
              {isRevice ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="check"
                  onClick={() => {
                    setIsRevice(false);
                    modiComment();
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPen}
                  className="modify"
                  onClick={() => {
                    setIsRevice(true);
                  }}
                />
              )}

              <FontAwesomeIcon
                icon={faXmark}
                className="delete"
                onClick={() => {
                  handleModal("삭제", "삭제하시겠습니까?", true, 1);
                  setEditId(comt.commentId);
                }}
              />
            </div>
          )}
          <div className="select_box">
            <label htmlFor="field">
              <select
                name="rating_field"
                id="field"
                size={1}
                defaultValue={comt.ratingField}
                disabled={isRevice ? false : true}
                onChange={(e) => {
                  setEditField(e.target.value);
                }}
              >
                <option value="연출">연출</option>
                <option value="배우">배우</option>
                <option value="OST">OST</option>
                <option value="영상미">영상미</option>
                <option value="스토리">스토리</option>
              </select>
            </label>

            <label htmlFor="num" className="num">
              <select
                name="rating_num"
                id="num"
                size={1}
                defaultValue={comt.ratingNum}
                disabled={isRevice ? false : true}
                onChange={(e) => {
                  setEditNum(e.target.value);
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </label>
          </div>

          <div className="bar"></div>

          {isRevice ? (
            <textarea
              className="comment"
              placeholder="관람평을 입력해주세요"
              defaultValue={comt.ratingText}
              disabled={false}
              onChange={(e) => {
                setEditText(e.target.value);
              }}
            ></textarea>
          ) : (
            <p className="P_comment">{comt.ratingText}</p>
          )}
        </div>
      </ComtComp>
    </>
  );
};
export default Comt;
