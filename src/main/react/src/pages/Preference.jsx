import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserStore";
import PreferComp from "../component/Preference/preferStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../util/Button";
import Modal from "../util/Modal";
import { useNavigate, useParams } from "react-router-dom";
import PreferApi from "../api/PreferApi";
import useTokenAxios from "../hooks/useTokenAxios";

const Preference = () => {
  const context = useContext(UserContext);
  const { setIsPrefer } = context;
  const navigate = useNavigate();
  const { type } = useParams();

  // 모달 관련
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(null);

  // 모달 닫기
  const closeModal = (num) => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type, num) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
    setModalConfirm(num);
  };

  // 감독 검색
  const [directorList, setDirectorList] = useState([]);
  const [inputDirector, setInputDirector] = useState("");
  const [isDirector, setIsDirector] = useState("");
  const maxDirectors = 3;

  // 감독 추가
  const addDirector = () => {
    console.log("addDirector 함수가 호출되었습니다.");
    // inputDirector이 비어있는지 확인
    if (inputDirector.trim() === "") {
      console.log("감독 이름이 비어있습니다.");
      handleModal(
        "입력값 없음",
        "입력값이 없습니다. \n 이름을 입력해 주세요.",
        false
      );
      return;
    }
    if (directorList.length < maxDirectors) {
      // 중복 검사
      if (!directorList.includes(inputDirector)) {
        setDirectorList(directorList.concat(inputDirector));
        setInputDirector("");
        console.log(directorList);
        setIsDirector(true);
      } else {
        // 중복된 경우에 대한 처리
        console.log("이미 추가된 감독입니다.");
        // 검색 결과가 중복일 경우 모달 열기
        handleModal(
          "이름 중복",
          "같은 이름이 이미 있습니다 \n 다른 이름을 검색어를 시도해보세요.",
          false
        );
        setInputDirector("");
      }
    }
  };

  // 감독 삭제
  const deleteDirector = (idx) => {
    const updatedDirectorList = directorList.filter(
      (_, index) => index !== idx
    );

    setDirectorList(updatedDirectorList);
  };

  // 배우 검색
  const [actorList, setActorList] = useState([]);
  const [inputActor, setInputActor] = useState("");
  const [isActor, setIsActor] = useState("");
  const maxActors = 3;

  // 배우 추가
  const addActor = () => {
    console.log("addActor 함수가 호출되었습니다.");
    // inputActor이 비어있는지 확인
    if (inputActor.trim() === "") {
      console.log("배우 이름이 비어있습니다.");
      handleModal(
        "입력값 없음",
        "입력값이 없습니다. \n 이름을 입력해 주세요.",
        false
      );
      return;
    }

    if (actorList.length < maxActors) {
      // 중복 검사
      if (!actorList.includes(inputActor)) {
        setActorList(actorList.concat(inputActor));
        setInputActor("");
        console.log(actorList);
        setIsActor(true);
      } else {
        // 중복된 경우에 대한 처리
        console.log("이미 추가된 배우입니다.");
        // 검색 결과가 중복일 경우 모달 열기
        handleModal(
          "이름 중복",
          "같은 이름이 이미 있습니다 \n 다른 이름을 검색어를 시도해보세요.",
          false
        );
        setInputActor("");
      }
    }
  };

  // 배우 삭제
  const deleteActor = (idx) => {
    const updatedActorList = actorList.filter((_, index) => index !== idx);

    setActorList(updatedActorList);
  };

  // 성별
  const [selectedGender, setSelectedGender] = useState(null);
  const [isGender, setIsGender] = useState("");

  // 성별 고르기
  const handleGenderCheck = (gender) => {
    setSelectedGender(gender);
    console.log(gender);
    setIsGender(true);
  };

  // 장르 상태 및 최대 선택 가능한 개수 설정
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isGenres, setIsGenres] = useState("");
  const maxGenres = 3; // 최대 선택 할 수 있는 개수

  // 체크박스 변경 시 호출되는 함수
  const handleCheckboxChange = (genre) => {
    // 이미 선택된 장르인지 확인
    const isSelected = selectedGenres.includes(genre);

    if (isSelected) {
      // 이미 선택된 경우 해제
      setSelectedGenres(
        selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
      );
    } else {
      // 선택되지 않은 경우 추가(단 , 최대 개수를 초과하지 않아야 함)
      if (selectedGenres.length < maxGenres) {
        setSelectedGenres([...selectedGenres, genre]);
        console.log(genre);
        setIsGenres(true);
      }
    }
  };

  // 등록 할 때 수정 시
  useEffect(() => {
    console.log("감독 : " + directorList);
    console.log("배우 : " + actorList);
    console.log("성별 : " + selectedGender);
    console.log("장르 : " + selectedGenres);
    if (directorList.length === 0) {
      setIsDirector(false);
    }

    if (actorList.length === 0) {
      setIsActor(false);
    }

    if (selectedGenres.length === 0) {
      setIsGenres(false);
    }
  }, [directorList, actorList, selectedGenres]);

  // 수정 일때
  useEffect(() => {
    if (type !== "new") {
      setIsDirector(true);
      setIsActor(true);
      setIsGender(true);
      setIsGenres(true);
    }
  }, []);

  // 취소 버튼 누르면 메인으로 이동
  const clickCancel = () => {
    navigate(-1);
  };

  // 취향 선택 등록하기
  const savePrefer = async () => {
    const res = await PreferApi.savePrefer(
      directorList.join(","),
      actorList.join(","),
      selectedGender,
      selectedGenres.join(",")
    );
    if (res.data === true) {
      console.log("저장 성공");
      setIsPrefer(res.data);
      preferMovieSave();
    } else {
      console.log("저장 실패");
    }
  };

  // 취향 등록 토큰
  const preferSave = useTokenAxios(savePrefer);

  const [preferId, setPreferId] = useState(null);

  // 회원 취향 정보 불러오기
  const fetchPreferData = async () => {
    try {
      console.log("api 요청 전");
      const res = await PreferApi.getPreferInfo();
      console.log("api 요청 후 : ", res);
      if (res.data !== null && res.data !== undefined) {
        setDirectorList(res.data.directorName.split(","));

        setActorList(res.data.actorName.split(","));

        setSelectedGender(res.data.gender);

        setSelectedGenres(res.data.genre.split(","));

        setPreferId(res.data.id);
      }
    } catch (error) {
      console.error("취향 정보를 불러오는데 실패했습니다.", error);
    }
  };

  const getPreferData = useTokenAxios(fetchPreferData);

  useEffect(() => {
    if (type === "revise") {
      getPreferData(); // 취향 정보 가져옴
    }
  }, []);

  // 취향 선택 수정하기
  const modifyPrefer = async () => {
    const res = await PreferApi.modifyPrefer(
      preferId,
      directorList.join(","),
      actorList.join(","),
      selectedGender,
      selectedGenres.join(",")
    );
    if (res.data) {
      console.log("수정 성공");
      preferMovieSave();
    }
  };

  const preferMovieSave = async () => {
    const res = await PreferApi.saveRecsMovie();
    if (res.data) {
      console.log("영화추천 저장 성공");
      type === "new"
        ? handleModal("성공", "등록이 완료되었습니다.", false, 0)
        : handleModal("성공", "수정이 완료되었습니다.", false, 1);
    }
  };

  // 취향 수정 토큰
  const preferModify = useTokenAxios(modifyPrefer);

  return (
    <>
      <PreferComp>
        <div className="container">
          <h2>내 영화 취향 {type === "new" ? "등록" : "수정"}하기</h2>
          <div className="searchSel selDirector">
            <h3>| 선호하는 감독(최대 3명)</h3>
            <div className="searchBar">
              <div className="search">
                <input
                  type="text"
                  placeholder="감독 이름을 입력하세요."
                  value={inputDirector}
                  onChange={(e) => setInputDirector(e.target.value)}
                  onKeyPress={(e) => {
                    console.log("onKeyDown 발생");
                    if (e.key === "Enter") {
                      e.preventDefault(); // 기본 Enter 행동 방지
                      addDirector();
                    }
                  }}
                />
                <button onClick={addDirector}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div className="selBox">
                <div className="sel director">
                  {directorList &&
                    directorList.map((director, index) => (
                      <>
                        <span className="name" key={index}>
                          <span>
                            {director}
                            <button
                              onClick={() => {
                                deleteDirector(index);
                              }}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </span>
                        </span>
                      </>
                    ))}
                </div>
              </div>
            </div>
            <div className="searchSel selActor">
              <h3>| 선호하는 배우(최대 3명)</h3>
              <div className="searchBar">
                <div className="search">
                  <input
                    type="text"
                    placeholder="배우 이름을 입력하세요."
                    value={inputActor}
                    onChange={(e) => setInputActor(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // 기본 Enter 행동 방지
                        addActor();
                      }
                    }}
                  />
                  <button onClick={addActor}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
                <div className="selBox">
                  <div className="sel actor">
                    {actorList &&
                      actorList.map((actor, index) => (
                        <>
                          <span className="name" key={index}>
                            <span>
                              {actor}
                              <button
                                onClick={() => {
                                  deleteActor(index);
                                }}
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </button>
                            </span>
                          </span>
                        </>
                      ))}
                  </div>
                </div>
              </div>
              <div className="genderSel">
                <h3>| 성별 선택</h3>
                <div class="form_toggle">
                  <div className="form_radio_btn radio_female">
                    <input
                      id="radio-1"
                      type="radio"
                      name="성별"
                      value="female"
                      checked={selectedGender === "female"}
                      onChange={() => handleGenderCheck("female")}
                    />
                    <label htmlFor="radio-1">여성</label>
                  </div>
                  <div className="form_radio_btn">
                    <input
                      id="radio-2"
                      type="radio"
                      name="성별"
                      value="male"
                      checked={selectedGender === "male"}
                      onChange={() => handleGenderCheck("male")}
                    />
                    <label htmlFor="radio-2">남성</label>
                  </div>
                </div>
              </div>
              <div className="selectGenre">
                <h3>| 영화 장르 선택(최대 3개)</h3>
                <div className="genre">
                  {/* 각 장르 체크박스 렌더링 */}
                  {[
                    "가족",
                    "로맨스",
                    "범죄",
                    "SF",
                    "공포호러",
                    "어드벤처",
                    "다큐멘터리",
                    "애니메이션",
                    "판타지",
                    "코미디",
                    "멜로",
                    "드라마",
                    "사극",
                    "미스터리",
                    "액션",
                    "스릴러",
                  ].map((genre) => (
                    <div className="form_checkbox_btn" key={genre}>
                      <input
                        type="checkbox"
                        id={genre}
                        checked={selectedGenres.includes(genre)}
                        onChange={() => handleCheckboxChange(genre)}
                      />
                      <label htmlFor={genre}>{genre}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="buttonBox">
                <Button
                  children={type === "new" ? "등록하기" : "수정하기"}
                  front={"var(--RED)"}
                  back={"var(--DARKRED)"}
                  width="200px"
                  height="50px"
                  fontSize="20px"
                  active={
                    isActor && isDirector && isGender && isGenres === true
                  }
                  clickEvt={() => {
                    type === "new" ? preferSave() : preferModify();
                  }} // 저장하는 api 함수 호출
                />
                {type !== "new" && (
                  <Button
                    children="취소하기"
                    front="var(--GREY)"
                    back="var(--DARKGREY)"
                    width="200Px"
                    height="50px"
                    fontSize="20px"
                    active={true}
                    clickEvt={clickCancel}
                  />
                )}
              </div>
              <Modal
                open={openModal}
                close={closeModal}
                header={modalHeader}
                children={modalMsg}
                type={modalType}
                closeEvt={() => {
                  if (modalConfirm === 0) {
                    navigate("/");
                  } else if (modalConfirm === 1) {
                    navigate(-1);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </PreferComp>
    </>
  );
};
export default Preference;
