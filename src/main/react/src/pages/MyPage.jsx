import BookMarkList from "../component/MyPage/BookMakrList";
import MembershipJoin from "../component/MyPage/MembershipJoin";
import MyInfo from "../component/MyPage/MyInfo";
import MemberApi from "../api/MemberApi";
import useTokenAxios from "../hooks/useTokenAxios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserStore";

const MyPage = () => {
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState([]);
  const context = useContext(UserContext);
  const { loginStatus } = context;

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login"); // 로그인 하지 않았다면 로그인 페이지로 이동
    }
  }, []);

  const memberDetail = async () => {
    const res = await MemberApi.getMemberDetail();
    // console.log("상세회원정보 : " + res.data);
    if (res.data !== null) {
      setMemberInfo(res.data);
    }
  };
  const getMemberDetail = useTokenAxios(memberDetail);

  useEffect(() => {
    if (loginStatus) {
      getMemberDetail();
    }
  }, []);

  // 멤버십 여부 back 실행 시켜야 오류가 뜨지 않습니다

  return (
    <>
      <MyInfo memberInfo={memberInfo && memberInfo} />
      {memberInfo && !memberInfo.isMembership && <MembershipJoin />}
      <BookMarkList />
    </>
  );
};
export default MyPage;
