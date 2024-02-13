import axios from "axios";
import Common from "../util/Common";

const TheaterApi = {
  // 지도 "주소" 키워드 검색
  theaterAddrSearch: async (keyword) => {
    console.log("극장정보 api 진입 : ", +keyword);
    return await axios.get(
      Common.CP_DOMAIN + `/theater/searchTheaterAddr?keyword=${keyword}`
    );
  },

  // theaterId로 영화관 내용 상세 조회
  theaterIdDetail: async () => {
    return await axios.get(
      Common.CP_DOMAIN + `/theater/theaterListById/${1224}` // 초기 데이터 값(롯데시네마 롯데타워점) "ID: 1224"
    );
  },
};

export default TheaterApi;
