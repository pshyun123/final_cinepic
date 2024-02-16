import { RadioBox } from "../component/NewPost/RadioBox";
import Button from "../util/Button";
import { NewPostComp } from "../component/NewPost/NewPostStyle";
import postImage from "../images/PostImage.png";
import { storage } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MemberApi from "../api/MemberApi";
import BoardApi from "../api/BoardApi";
import useTokenAxios from "../hooks/useTokenAxios";
import Modal from "../util/Modal";

const NewPost = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [memberInfo, setMemberInfo] = useState(null);

  const fetchMemberDetail = async () => {
    const res = await MemberApi.getMemberDetail();
    if (res.data !== null) setMemberInfo(res.data);
  };
  const getMemberDetail = useTokenAxios(fetchMemberDetail);

  // 카테고리(주제선택) 및 모임형식(온/오프라인)
  const [selCategory, setSelCategory] = useState("");
  const [selGather, setSelGather] = useState("");
  const [isCategory, setIsCategory] = useState("");
  const [isGather, setIsGather] = useState("");

  const CategoryChange = (e) => {
    const currVal = e.target.value;
    setSelCategory(currVal);
    if (currVal !== "") {
      setIsCategory(true);
    } else {
      setIsCategory(false);
    }
  };
  const GatherTypeChange = (e) => {
    const currVal = e.target.value;
    setSelGather(currVal);
    if (currVal !== "") {
      setIsGather(true);
    } else {
      setIsGather(false);
    }
  };

  // 제목과 내용, 필수사항
  const [inputTitle, setInputTitle] = useState("");
  const [inputContents, setInputContents] = useState("");
  const [isTitle, setIsTitle] = useState("");
  const [isContents, setIsContents] = useState("");

  const InputTitleChange = (e) => {
    const currVal = e.target.value;
    setInputTitle(currVal);
    if (currVal.length > 0) setIsTitle(true);
    else setIsTitle(false);
  };
  const InputContentsChange = (e) => {
    const currVal = e.target.value;
    setInputContents(currVal);
    if (currVal.length > 0) setIsContents(true);
    else setIsContents(false);
  };

  // 작성 날짜
  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}.${month}.${day}`;
    };

    setCurrentDate(getCurrentDate());
    getMemberDetail();
  }, []);

  // 게시글 리스트로 이동
  const navigate = useNavigate();
  const toBoardList = () => {
    navigate(-1);
  };

  // 이미지 업로드
  const [imgSrc, setImgSrc] = useState(postImage);
  const [file, setFile] = useState("");
  const [isImage, setIsImage] = useState(false);

  // 입력받은 이미지 파일 주소
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files?.[0];

    // 선택된 파일을 파이어베이스로
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImgSrc(objectUrl);
      setFile(selectedFile);
      setIsImage(true);
    }
  };

  // 모달창
  const [openModal, setModalOpen] = useState(false);
  const closeModal = (num) => {
    setModalOpen(false);
    switch (selCategory) {
      case "씨네크루":
        navigate("/board/gather");
        break;
      case "크루후기":
        navigate("/board/recap");
        break;
      default:
        console.log("카테고리 오류");
    }
  };
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  const handleModal = (header, msg, type) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  const onSubmit = () => {
    if (imgSrc !== postImage) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(() => {
        // console.log("저장성공!");
        fileRef.getDownloadURL().then((url) => {
          // console.log("저장경로 확인 : " + url);
          // console.log("url" + url);
          newPost(url);
        });
      });
    } else {
      newPost();
    }
  };
  const postSave = useTokenAxios(onSubmit);

  const newPost = async (url) => {
    const res = await BoardApi.saveNewPost(
      selCategory,
      selGather,
      inputTitle,
      url,
      inputContents
    );
    if (res.data) {
      // console.log("저장 성공!");
      handleModal(
        "새 글 등록 성공",
        selCategory + "(" + selGather + ")에 게시글 등록이 완료 되었습니다.",
        false
      );
    }
  };

  return (
    <>
      <NewPostComp>
        <div className="container">
          <div className="postIntro">
            <h2 className="introTop">새로운 게시글을 작성해보세요!</h2>
            <p>
              씨네크루를 만들어 함께 영화를 보고, 크루후기를 남겨 추억을
              기록하세요.
            </p>
          </div>
          <div className="postBox">
            <div className="selectTheme">
              <h3>주제 선택</h3>
              <RadioBox>
                <div className="themeSelectBtn">
                  <label className="cineCrew" htmlFor="씨네크루">
                    <input
                      type="radio"
                      id="씨네크루"
                      value="씨네크루"
                      name="category"
                      onChange={CategoryChange}
                    />
                    씨네크루
                  </label>
                  <label className="postCrew" htmlFor="크루후기">
                    <input
                      type="radio"
                      id="크루후기"
                      value="크루후기"
                      name="category"
                      onChange={CategoryChange}
                    />
                    크루후기
                  </label>
                </div>
              </RadioBox>
            </div>
            <div className="meetingType">
              <h3>모임 유형</h3>
              <RadioBox>
                <div className="typeSelectBtn">
                  <label className="online" htmlFor="온라인">
                    <input
                      type="radio"
                      id="온라인"
                      value="온라인"
                      name="meetingSpot"
                      onChange={GatherTypeChange}
                    />
                    온라인
                  </label>
                  <label className="offline" htmlFor="오프라인">
                    <input
                      type="radio"
                      id="오프라인"
                      value="오프라인"
                      name="meetingSpot"
                      onChange={GatherTypeChange}
                    />
                    오프라인
                  </label>
                </div>
              </RadioBox>
            </div>
            <div className="author">
              <h3>작성자</h3>
              <p>{memberInfo && memberInfo.alias}</p>
            </div>
            <div className="regDate">
              <h3>작성일</h3>
              <p>{currentDate}</p>
            </div>
            <div className="postTitle">
              <h3>제 목</h3>
              <input
                type="text"
                value={inputTitle}
                placeholder="제목을 입력해주세요."
                onChange={InputTitleChange}
              ></input>
            </div>
            <div className="postImage">
              <h3>이미지</h3>
              <div className="uploadImage">
                <div className="imgBox">
                  <img src={imgSrc} alt="게시글 첨부 이미지" />
                </div>
                <label>
                  <input
                    type="file"
                    onChange={(e) => handleFileInputChange(e)}
                  />
                  파일 선택
                </label>
              </div>
            </div>
            <div className="contents">
              <h3>내 용</h3>
              <textarea
                type="text"
                value={inputContents}
                placeholder="내용을 입력해주세요."
                onChange={InputContentsChange}
              ></textarea>
            </div>
            <div className="buttonBox">
              <Button
                children="등록하기"
                active={
                  isCategory && isGather && isTitle && isContents && isImage
                }
                front="var(--RED)"
                back="var(--DARKRED)"
                clickEvt={postSave}
              />
              <Button
                children="목록보기"
                active={true}
                front="var(--DARKGREY)"
                back="var(--BLACK)"
                clickEvt={toBoardList}
              />
            </div>
          </div>
        </div>
      </NewPostComp>
      <Modal
        open={openModal}
        close={closeModal}
        header={modalHeader}
        children={modalMsg}
        type={modalType}
      />
    </>
  );
};
export default NewPost;
