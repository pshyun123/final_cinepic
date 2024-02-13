import { Outlet } from "react-router-dom";
import Header from "../component/Layout/Header/Header";
import Footer from "../component/Layout/Footer";
import { useEffect, useContext, useState, useRef } from "react";
import { UserContext } from "../context/UserStore";
import ScrollToTop from "../component/Layout/ScrollToTop";
import Modal from "../util/Modal";
import MemberApi from "../api/MemberApi";
import { useNavigate } from "react-router-dom";
import Ad from "../component/Layout/Ad";
import useTokenAxios from "../hooks/useTokenAxios";
import PreferApi from "../api/PreferApi";

const Layout = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  // 로그인 / 멤버쉽 여부
  const {
    loginStatus,
    setLoginStatus,
    setIsPrefer,
    isMembership,
    setIsMembership,
  } = context;

  //Modal
  // 여기서부터
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  // 멤버십 정보 호출
  const fetchIsMember = async () => {
    const res = await MemberApi.getMembership();
    if (res.data) {
      setIsMembership(res.data);
      console.log("시네픽 멤버 : " + res.data);
    }
  };

  const getIsMembership = useTokenAxios(fetchIsMember);

  const fetchIsPrefer = async () => {
    const res = await PreferApi.getIsPrefer();
    if (!res.data) {
      navigate("/preference/new");
    } else {
      setIsPrefer(res.data);
    }
  };
  const getIsPrefer = useTokenAxios(fetchIsPrefer);

  useEffect(() => {
    // console.log("로그인 여부" + loginStatus);
    // console.log("cinepic" + isMembership);
    if (loginStatus === "ADMIN") {
      setLoginStatus("");
      window.localStorage.clear();
    } else if (loginStatus === "RELOGIN") {
      console.log("토큰만료");
      setLoginStatus("");
      window.localStorage.clear();
      handleModal(
        "로그인 유효기간 만료",
        "보안을 위해 다시 로그인해주세요",
        true
      );
    } else if (loginStatus) {
      getIsMembership();
      getIsPrefer();
    }
  }, [loginStatus]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
        {/* 로그인 여부를 props로 전달 */}
        {!isMembership && <Ad isLogin={loginStatus} />}
      </main>

      <Footer />
      <Modal
        open={openModal}
        close={closeModal}
        header={modalHeader}
        children={modalMsg}
        type={modalType}
        confirm={() => {
          navigate("/login");
          closeModal();
        }}
      />
    </>
  );
};
export default Layout;
