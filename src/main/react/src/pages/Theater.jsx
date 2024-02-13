import React, { useEffect, useRef, useState } from "react";
import TheaterComp from "../component/Theater/theaterStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TheaterApi from "../api/TheaterApi";
import TheaterBannerComp from "../component/Theater/theaterBanner";
import Modal from "../util/Modal";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Theater = () => {
  const mapRef = useRef(null); // 지도 링크
  const [location, setLocation] = useState({
    lat: 37.5139545,
    long: 127.1049251,
  }); // 위도, 경도
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [map, setMap] = useState(null); // 지도
  const [theaterData, setTheaterData] = useState([]); // 극장 정보 불러오기
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 데이터 불러오기
  const [markers, setMarkers] = useState([]); // 마커 배열

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

  // 지도 불러오기
  useEffect(() => {
    const container = mapRef.current; // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(location.lat, location.long),
      level: 3,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);

    // 맵에 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    kakaoMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // 지도 & 스카이뷰 추가
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    kakaoMap.addControl(
      mapTypeControl,
      window.kakao.maps.ControlPosition.TOPRIGHT
    );

    // 서버에서 초기값을 불러오는 비동기 함수(theaterId 아이디 값으로 초기데이터 가져오기)
    const fetchInitialData = async () => {
      try {
        const resp = await TheaterApi.theaterIdDetail();
        setTheaterData([resp.data]);
        console.log("초기 데이터 : " + resp.data.longitude);
        setSelectedPlace(resp.data);
        setLocation({ lat: resp.data.latitude, long: resp.data.longitude });
      } catch (error) {
        console.error("초기 값 정보가 아님:", error);
      }
    };
    fetchInitialData(); // 초기데이터 렌더링
  }, []);

  // 검색 상자
  const handleSearchInputChange = (event) => {
    console.log("검색 : ", searchQuery);
    setSearchQuery(event.target.value);
  };

  // 검색 확인 버튼 누를 시 내용 조회
  const handleSearchButtonClick = async () => {
    console.log("검색 키워드: ", searchQuery);
    const resp = await TheaterApi.theaterAddrSearch(searchQuery);
    if (resp.data !== null && resp.data.length > 0) {
      // 검색 결과가 있을 경우
      setTheaterData(resp.data);
      console.log("지도정보 : " + resp.data);
      setSearchQuery(""); // 엔터 시 글 초기화
      setLocation({ lat: resp.data[0].latitude, long: resp.data[0].longitude });
    } else {
      console.log("검색결과 없음");
      // 검색 결과가 없는 경우 모달 열기
      handleModal(
        "검색 결과 없음",
        "검색 결과가 없습니다. \n 다른 지역이나 검색어를 시도해보세요.",
        false,
        0
      );
      setSearchQuery(""); // 엔터 시 글 초기화
    }
  };

  // 지도에 마커 표시하기
  useEffect(() => {
    if (!theaterData) return;
    markers.forEach((marker) => marker.setMap(null));

    // 마커 색 설정 및 마커 위치표시
    const newMarkers = theaterData.map((place) => {
      // 마커 이미지의 url을 설정해 마커 색상 바꿈
      const markerImage = new window.kakao.maps.MarkerImage(
        // 마커 이미지 url
        "https://firebasestorage.googleapis.com/v0/b/kh-miniproject.appspot.com/o/%E1%84%88%E1%85%A1%E1%86%AF%E1%84%80%E1%85%A1%E1%86%AB%E1%84%86%E1%85%A1%E1%84%8F%E1%85%A5-removebg-preview.png?alt=media&token=216166b6-2769-445a-bac7-a1c0e248b1ad",
        new window.kakao.maps.Size(40, 55), // 마커 이미지의 크기 지정
        {
          offset: new window.kakao.maps.Point(15, 30), //마커 이미지의 중심 좌표 지정
          alt: "마커 이미지",
          clickable: true,
        }
      );

      // 마커 위에 영화관 이름 띄우기
      const markerPosition = new window.kakao.maps.LatLng(
        place.latitude,
        place.longitude
      );
      // 마커 핀 꽂힘
      const placeMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        image: markerImage, // 마커 이미지 설정
      });
      placeMarker.setMap(map); // 지도에 마커 표시

      // 인포윈도우 표시
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="width:200px; font-size:14px; padding: 10px; text-align: center;">${place.theaterName}</div>`, // 장소에 대한 정보 표시
        position: markerPosition,
      });

      // 마우스 호버 때와 아닐 때 초기 값
      let isOpen = false;

      // 마커에 마우스오버 이벤트를 등록
      window.kakao.maps.event.addListener(placeMarker, "mouseover", () => {
        isOpen = true;
        infowindow.open(map, placeMarker);
      });

      // 마커에 마우스아웃 이벤트를 등록
      window.kakao.maps.event.addListener(placeMarker, "mouseout", () => {
        isOpen = false;
        infowindow.close();
      });

      window.kakao.maps.event.addListener(placeMarker, "click", () => {
        setSelectedPlace(place);
        // 장소가 이동 될 때 마커를 누르면 맵 센터로 이동
        map.setLevel(2);
        map.setCenter(
          new window.kakao.maps.LatLng(place.latitude, place.longitude)
        );
        // 인포윈도우를 기본적으로 열어둠
        infowindow.open(map, placeMarker);
      });
      return placeMarker;
    });
    setMarkers(newMarkers);
    // 영화관 검색된 지역의 DB의 첫번째 값이 화면에 띄어지게 함
    if (theaterData.length > 0) {
      const firstPlace = theaterData[0];
      map.setCenter(
        new window.kakao.maps.LatLng(firstPlace.latitude, firstPlace.longitude)
      );
      setSelectedPlace(firstPlace); // 검색하고 이동 시 처음 마커의 내용 나오게 함
    }
  }, [theaterData, map]);

  return (
    <>
      <TheaterComp>
        {/* 영화관 배너 포스터 */}
        <TheaterBannerComp />
        <div className="container">
          <h2>
            <div className="titleIcon">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            영화관 지도 검색
          </h2>
          <div className="mapContainer" ref={mapRef}></div>
          <div className="searchContainer">
            <div className="inputWapper">
              <div className="searchBox">
                <input
                  type="text"
                  placeholder="지역 / 구 단위로 입력"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyUp={(e) => {
                    if (e.key === "Enter" && searchQuery.trim() !== "") {
                      e.preventDefault(); // Enter 키의 기본 동작 방지
                      handleSearchButtonClick();
                    }
                  }}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  onClick={handleSearchButtonClick}
                />
              </div>
            </div>
          </div>
          <Modal
            open={openModal}
            close={closeModal}
            header={modalHeader}
            children={modalMsg}
            type={modalType}
            closeEvt={() => {
              if (modalConfirm === 0) {
              }
            }}
          />

          {selectedPlace && selectedPlace !== null && (
            <div className="infoContainer" key={selectedPlace.id}>
              {/* CGV 청주(서문) */}
              <h3>{selectedPlace.theaterName}</h3>
              <div className="basicInfo1">
                <h3>기본정보</h3>
                <div className="content1">
                  <div>
                    <span className="title">상영관 </span>
                    <span>{selectedPlace.theaterName}</span>
                  </div>
                  <div>
                    <span className="title">주소 </span>
                    <span className="address">{selectedPlace.theaterAddr}</span>
                  </div>
                  <div>
                    <span className="title">전화번호 </span>
                    <span>{selectedPlace.theaterPhone}</span>
                  </div>
                  <div>
                    <span className="title">총 좌석 수 </span>
                    <span>{selectedPlace.seats.toLocaleString()}석</span>
                    {/* toLocaleString() -> 천 단위에서 콤마 생기게 함 */}
                  </div>
                </div>
              </div>
              <div className="basicInfo2">
                <h3>스크린관 정보</h3>
                <div className="content2">
                  <div>
                    <span className="title">총 스크린 수 </span>
                    <span className="element">{selectedPlace.screens}개</span>
                  </div>
                  <div>
                    <span className="title">특별관 운영 여부 </span>
                    <span className="element">
                      {selectedPlace.isSpecialScreen == 1 ? "있음" : "없음"}
                      {/* 1이면 있음, 0 이면 없음 표시 */}
                    </span>
                  </div>
                  <div>
                    <span className="title">필름 상영관 수 </span>
                    <span className="element">
                      {selectedPlace.screenFilm}개
                    </span>
                  </div>
                  <div>
                    <span className="title"> 2D 상영관 수 </span>
                    <span className="element">{selectedPlace.screen2D}개</span>
                  </div>
                  <div>
                    <span className="title">3D 상영관 수 </span>
                    <span className="element"> {selectedPlace.screen3D}개</span>
                  </div>
                  <div>
                    <span className="title">4D 상영관 수 </span>
                    <span className="element">{selectedPlace.screen4D}개</span>
                  </div>
                  <div>
                    <span className="title"> IMAX 상영관 수 </span>
                    <span className="element">
                      {selectedPlace.screenImax}개
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheaterComp>
    </>
  );
};

export default Theater;
