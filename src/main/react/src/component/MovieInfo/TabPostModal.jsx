import styled from "styled-components";
import Button from "../../util/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../../api/firebase";
import useTokenAxios from "../../hooks/useTokenAxios";

const PostModalComp = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 996;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.8s;
  }
  section {
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    position: relative;
    @media only screen and (max-width: 480px) {
      padding: 16px;
    }

    h3 {
      font-size: 26px;
      font-weight: 900;
      margin-bottom: 20px;
      @media only screen and (max-width: 480px) {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
    .close_btn {
      font-size: 36px;
      cursor: pointer;

      position: absolute;
      top: 22px;
      right: 26px;
      svg {
      }
      @media only screen and (max-width: 480px) {
        font-size: 26px;
        top: 16px;
        right: 20px;
      }
    }

    .input_box {
      width: 100%;
      text-align: center;
      .file_box {
        overflow: hidden;
        p {
          margin-bottom: 20px;
          @media only screen and (max-width: 768px) {
            font-size: 1.3em;
          }
        }
        img {
          height: 300px;
          margin: 20px 0;
          @media only screen and (max-width: 480px) {
            height: 200px;
          }
        }
      }
      .box {
        display: flex;
        justify-content: end;
        label {
          display: inline-block;
          margin-bottom: 30px;
          padding: 10px 15px;

          border: 1px solid var(--RED);
          border-radius: 5px;
          color: var(--BLACK);
          font-weight: 300;
          font-size: 1em;
          cursor: pointer;
          @media only screen and (max-width: 768px) {
            font-size: 1.2em;
          }
          .input_file {
            display: none;
          }
        }
      }
      p {
        margin-bottom: 10px;
        text-align: left;
        span {
          padding: 0 3px;
          padding-bottom: 6px;
          color: var(--ORANGE);
          font-size: 1.1em;
          display: inline-block;
          @media only screen and (max-width: 768px) {
            font-size: 1.3em;
          }
        }
      }

      .input_text {
        display: inline-block;
        width: 100%;
        border: none;
        border-bottom: 1px solid var(--GREY);
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-size: 1.3em;
        background-color: #fff;
        @media only screen and (max-width: 768px) {
          font-size: 1.4em;
        }
      }
      textarea {
        display: inline-block;
        width: 100%;
        height: 200px;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid var(--GREY);
        border-radius: 10px;
        font-size: 1.1em;
        background-color: #fff;
        resize: none;
        font-family: "Noto Sans KR", sans-serif;
        &:focus {
          outline: none;
        }
        @media only screen and (max-width: 768px) {
          font-size: 1.3em;
        }
        @media only screen and (max-width: 480px) {
          height: 130px;
        }
      }
    }

    .btnBox {
      display: flex;
      justify-content: right;
      button {
        width: 56px;
        height: 40px;
        /* padding: 3px 16px; */
        color: #fff;
        font-size: 1em;
        font-weight: 300;
        border-radius: 5px;
        &:nth-child(2) {
          border: 1px solid var(--RED);
          margin-left: 10px;
          color: var(--RED);
        }
        @media only screen and (max-width: 768px) {
          /* width: auto; */
          font-size: 1.2em;
        }
        @media only screen and (max-width: 480px) {
          width: 48px;
          height: 34px;

          font-size: 1.1em;
        }
      }
    }
  }

  @media only screen and (max-width: 480px) {
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TabPostModal = (props) => {
  const {
    open,
    close,
    type,
    postImage,
    moviePostId,
    postAlias,
    userAlias,
    postTitle,
    onChangePostTitle,
    postContent,
    onChangePostContent,
    handleModal,
    savePost,
    modiPost,
  } = props;

  // useEffect(() => {
  //   console.log("수정할 포스트 아이디 : " + moviePostId);
  // }, [moviePostId]);
  // 수정 선택 여부
  const [isRevise, setIsRevise] = useState(false);

  // 이미지 업로드
  const [imgSrc, setImgSrc] = useState(postImage !== "" ? "" : postImage);
  const [file, setFile] = useState("");
  const [isImage, setIsImage] = useState(false);

  // 입력받은 이미지 파일 주소
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files?.[0];

    // 선택 된 파일을 파이어베이스로
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImgSrc(objectUrl);
      setFile(selectedFile);
      setIsImage(true);
    }
  };

  useEffect(() => {
    setImgSrc(postImage);
  }, [open]);

  const onSubmit = () => {
    if (imgSrc !== "" && imgSrc !== postImage) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(() => {
        fileRef.getDownloadURL().then((url) => {
          // console.log("저장경로 확인 : " + url);
          // console.log("url" + url);
          type === "view" ? modiPost(url) : savePost(url);
        });
      });
    } else {
      // console.log("파이어베이스 생략");
      type === "view" ? modiPost(imgSrc) : savePost(imgSrc);
    }
  };

  const submitPost = useTokenAxios(onSubmit);

  // useEffect(() => {
  //   console.log("imgSrc : " + imgSrc);
  // }, [imgSrc]);

  // useEffect(() => {
  //   console.log("modal rendered!");
  // }, []);

  // useEffect(() => {
  //   console.log("type : " + type);
  // }, [type]);

  return (
    <>
      <PostModalComp>
        <div
          className={open ? "openModal modal" : "modal"}
          onClick={() => {
            close();
            setIsRevise(false);
          }}
        >
          <section onClick={(e) => e.stopPropagation()}>
            <div className="contentBox">
              <h3>씨네포스트</h3>
              <div
                className="close_btn"
                onClick={() => {
                  close();
                  setIsRevise(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="m-menu"
                  onClick={close}
                />
              </div>
              <div className="input_box">
                <div className="file_box">
                  {imgSrc !== "" ? (
                    <img src={imgSrc} alt="이미지를 불러올 수 없습니다." />
                  ) : (
                    <p>이미지는 필수사항 입니다.</p>
                  )}
                </div>
                <div className="box">
                  {(type === "new" || isRevise) && (
                    <label htmlFor="file">
                      <input
                        type="file"
                        className="input_file"
                        id="file"
                        onChange={(e) => handleFileInputChange(e)}
                      />
                      파일 선택
                    </label>
                  )}
                </div>
                <p>
                  <span>{postAlias}</span>
                </p>
                <input
                  type="text"
                  value={postTitle}
                  className="input_text"
                  placeholder="제목"
                  onChange={onChangePostTitle}
                  disabled={isRevise || type === "new" ? false : true}
                />
                <textarea
                  value={postContent}
                  placeholder="내용을 입력해 주세요"
                  onChange={onChangePostContent}
                  disabled={isRevise || type === "new" ? false : true}
                ></textarea>
              </div>

              <div className="btnBox">
                {type === "view" && postAlias === userAlias && (
                  <Button
                    clickEvt={() => {
                      if (isRevise) {
                        submitPost();
                        handleModal(
                          "등록",
                          "게시글이 등록되었습니다.",
                          false,
                          1
                        );
                        close();
                        setIsRevise(false);
                      } else {
                        setIsRevise(true);
                      }
                    }}
                    active={postTitle.length > 0 && postContent.length > 0}
                    children={isRevise ? "등록" : "수정"}
                    width="80px"
                    front="var(--RED)"
                    back={"var(--DARKRED)"}
                  />
                )}
                {type === "new" && (
                  <Button
                    clickEvt={() => {
                      submitPost();
                      handleModal("등록", "게시글이 등록되었습니다.", false, 1);
                      close();
                    }}
                    active={
                      postContent.length > 0 && postTitle.length > 0 && isImage
                    }
                    children={"등록"}
                    width="80px"
                    front="var(--RED)"
                    back={"var(--DARKRED)"}
                  />
                )}
                {postAlias === userAlias && type === "view" && (
                  <Button
                    className="delButton"
                    clickEvt={() => {
                      handleModal("삭제", "삭제하시겠습니까?", true, 1);
                    }}
                    active={true}
                    children="삭제"
                    width="80px"
                    front={"#fff"}
                    back={"#fff"}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </PostModalComp>
    </>
  );
};

export default TabPostModal;
