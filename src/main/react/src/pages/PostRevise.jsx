import { RadioBox } from "../component/NewPost/RadioBox";
import Button from "../util/Button";
import { NewPostComp } from "../component/NewPost/NewPostStyle";
import postImage from "../images/PostImage.png";
import { useNavigate, useParams } from "react-router-dom";
import BoardApi from "../api/BoardApi";
import MemberApi from "../api/MemberApi";
import React, { useEffect, useState } from "react";
import useTokenAxios from "../hooks/useTokenAxios";
import { storage } from "../api/firebase";
import Modal from "../util/Modal";

const PostRevise = () => {
  // 게시글 상세로 이동
  const navigate = useNavigate();
  const toPostDetail = () => {
    navigate(`/board/post/${postId}`);
  };

  const [boardData, setBoardData] = useState("");
  const { postId } = useParams();
  const [memberInfo, setMemberInfo] = useState(null);
  const [regDate, setRegDate] = useState("");

  const fetchMemberDetail = async () => {
    const res = await MemberApi.getMemberDetail();
    if (res.data !== null) setMemberInfo(res.data);
  };
  const getMemberDetail = useTokenAxios(fetchMemberDetail);

  const fetchBoardData = async () => {
    // console.log("API 요청 전");
    const res = await BoardApi.boardDetail(postId);
    // console.log("API 요청 후 : ", res);
    if (res.data !== null) {
      setBoardData(res.data);
      setSelCategory(res.data.categoryName);
      setSelGather(res.data.gatherType);
      setInputTitle(res.data.title);
      setInputContents(res.data.boardContent);
      setImgSrc(res.data.image);

      const toDate = new Date(res.data.regDate);
      setRegDate(toDate.toISOString().split("T")[0]);
    }
  };
  const getBoardData = useTokenAxios(fetchBoardData);

  useEffect(() => {
    getMemberDetail(); // 멤버 정보 가져옴
    getBoardData(); // 게시글 정보 가져옴
  }, []);

  // 카테고리(주제선택) 및 모임형식(온/오프라인)
  const [selCategory, setSelCategory] = useState("");
  const [selGather, setSelGather] = useState("");

  const categoryChange = (e) => {
    setSelCategory(e.target.value);
  };
  const gatherTypeChange = (e) => {
    setSelGather(e.target.value);
  };

  // 제목 및 내용
  const [inputTitle, setInputTitle] = useState("");
  const [inputContents, setInputContents] = useState("");
  const InputTitleChange = (e) => {
    setInputTitle(e.target.value);
  };
  const InputContentsChange = (e) => {
    setInputContents(e.target.value);
  };

  // 이미지 업로드
  const [imgSrc, setImgSrc] = useState(postImage);
  const [file, setFile] = useState("");

  // 입력받은 이미지 파일 주소
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files?.[0];

    // 선택된 파일을 파이어베이스로
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImgSrc(objectUrl);
      setFile(selectedFile);
    }
  };

  // 모달
  const [openModal, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
    navigate(-1);
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

  // 게시글 수정
  const updatePost = async (url) => {
    const res = await BoardApi.updateBoard(
      boardData.id,
      selCategory,
      selGather,
      inputTitle,
      url,
      inputContents
    );

    if (res.data) {
      // console.log("저장 성공!");
      handleModal("성공", "수정이 완료되었습니다.", false);
    }
  };

  const onSubmit = () => {
    if (imgSrc !== postImage && imgSrc !== boardData.image) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(() => {
        // console.log("저장성공!");
        fileRef.getDownloadURL().then((url) => {
          // console.log("저장경로 확인 : " + url);
          // console.log("url" + url);
          updatePost(url);
        });
      });
    } else {
      updatePost();
    }
  };
  const postUpdate = useTokenAxios(onSubmit);

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
                      onChange={categoryChange}
                      checked={selCategory === "씨네크루" ? "checked" : ""}
                    />
                    씨네크루
                  </label>
                  <label className="postCrew" htmlFor="크루후기">
                    <input
                      type="radio"
                      id="크루후기"
                      value="크루후기"
                      name="category"
                      onChange={categoryChange}
                      checked={selCategory === "크루후기" ? "checked" : ""}
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
                      onChange={gatherTypeChange}
                      checked={selGather === "온라인" ? "checked" : ""}
                    />
                    온라인
                  </label>
                  <label className="offline" htmlFor="오프라인">
                    <input
                      type="radio"
                      id="오프라인"
                      value="오프라인"
                      name="meetingSpot"
                      onChange={gatherTypeChange}
                      checked={selGather === "오프라인" ? "checked" : ""}
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
              <p>{regDate}</p>
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
                children="수정하기"
                active={inputTitle !== "" && inputContents !== ""}
                front="var(--RED)"
                back="var(--DARKRED)"
                clickEvt={postUpdate}
              />
              <Button
                children="취소하기"
                active={true}
                front="var(--DARKGREY)"
                back="var(--BLACK)"
                clickEvt={toPostDetail}
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
export default PostRevise;
