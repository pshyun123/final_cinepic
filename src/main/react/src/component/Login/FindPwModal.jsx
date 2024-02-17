import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { InputButton, Input } from "../Join/JoinInput";
import { useState } from "react";
import MemberApi from "../../api/MemberApi";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: white;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: var(--RED);
      font-weight: 600;
      text-align: left;
      color: #fff;
      svg {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        padding: 10px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #fff;
        cursor: pointer;
      }
    }
    .wrapper {
      /* min-height: 40vh; */
      padding: 30px 30px 0 30px;
      border-bottom: 2px solid #dee2e6;
      color: #333;
      white-space: pre-line;
      line-height: 1.4;
      .verifyMail {
        p {
          margin-bottom: 20px;
        }
      }
      .newPw {
        p {
          margin-bottom: 20px;
        }
      }
    }
    footer {
      padding: 12px 16px;
      text-align: right;
      button {
        padding: 6px 12px;
        color: #fff;
        background-color: var(--RED);
        border-radius: 5px;
        font-size: 13px;
      }
    }
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

const Button = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  border: 0;
  width: 60px;
  &.false {
    background-color: var(--GREY);
    cursor: default;
    &:hover {
      background-color: var(--GREY);
    }
  }
`;

const FindPwModal = (props) => {
  const { open, close, header, handleModal } = props;

  const [isNext, setIsNext] = useState(false);

  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPw2, setInputPw2] = useState("");

  // 오류 메세지
  const [emailMessage, setEmailMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pw2Message, setPw2Message] = useState("");

  // 유효성
  const [isEmail, setIsEmail] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPw2, setIsPw2] = useState(false);

  // 정규식
  const regexList = [
    //email
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    //pw
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_#^*?])[A-Za-z\d@$!%_#^*?]{8,15}$/,
  ];

  // 이메일
  const onChangeEmail = (e) => {
    const currEmail = e.target.value;
    // console.log("currr" + currEmail);
    setInputEmail(currEmail);
    if (!regexList[0].test(currEmail)) {
      setEmailMessage("잘못 된 형식입니다.");
      setIsEmail(false);
    } else {
      setIsEmail(true);
      setEmailMessage("");
    }
  };

  // 이메일 여부
  const isExist = async () => {
    try {
      const res = await MemberApi.checkUnique(3, inputEmail);
      // console.log("이메일여부 : " + res.data);
      if (res.data) {
        setIsEmail(true);
        authorizeMail();
      } else {
        setEmailMessage("없는 이메일 또는 카카오 회원입니다.");
        setIsEmail(false);
      }
    } catch (err) {
      console.log("이메일체크 오류 : " + err);
    }
  };

  // 이메일 인증
  const [sentCode, setSentCode] = useState("");
  const authorizeMail = async () => {
    try {
      const res = await MemberApi.sendEmailCode(inputEmail);
      // console.log("이메일전송 결과 : " + res.data);
      if (res.data !== null) {
        setIsCodeSent(true);
        setEmailMessage("이메일로 인증번호가 발송되었습니다.");
        setSentCode(res.data);
      }
    } catch (e) {
      console.log("이메일 err : " + e);
    }
  };

  // 코드 입력
  const onChangeEmailCode = (e) => {
    const currCode = Number(e.target.value);
    // console.log("currr" + typeof currCode);
    // console.log("sentCode: " + typeof sentCode);
    // console.log("code : " + (currCode === sentCode));
    setInputCode(currCode);
  };
  const checkCode = () => {
    if (inputCode === sentCode) {
      setIsCode(true);
      setCodeMessage("인증이 완료되었습니다.");
    } else {
      setIsCode(false);
      setCodeMessage("인증번호를 확인해주세요.");
    }
  };

  // 비밀번호
  const onChangePw = (e) => {
    const currPw = e.target.value;
    setInputPw(currPw);
    if (!regexList[1].test(currPw)) {
      setPwMessage(
        "대소문자, 숫자, 특수기호 포함 8자 이상 15자 이하로 입력 하세요"
      );
      setIsPw(false);
      setIsPw2(false);
      setPw2Message("");
    } else {
      setPwMessage("사용 가능합니다");
      setIsPw(true);
    }
  };
  // 비밀번호 재 입력
  const onChangePw2 = (e) => {
    const currPw2 = e.target.value;
    setInputPw2(currPw2);
    if (currPw2 !== inputPw) {
      setPw2Message("입력한 비밀번호와 일치 하지 않습니다.");
      setIsPw2(false);
    } else if (isPw && currPw2 === inputPw) {
      setPw2Message("비밀번호가 일치합니다");
      setIsPw2(true);
    }
  };

  // 비밀번호 변경
  const chgPw = async () => {
    const res = await MemberApi.changePw(inputEmail, inputPw);
    if (res.data) {
      handleClose();
      handleModal("성공", "비밀번호가 변경되었습니다.");
    } else {
      handleClose();
      handleModal("오류", "오류가 발생했습니다 \n 잠시 후 다시 시도해주세요.");
    }
  };

  // 모달 초기화
  const resetState = () => {
    setIsNext(false);
    setInputEmail("");
    setInputCode("");
    setInputPw("");
    setInputPw2("");
    setEmailMessage("");
    setCodeMessage("");
    setPwMessage("");
    setPw2Message("");
    setIsEmail(false);
    setIsCodeSent(false);
    setIsCode(false);
    setIsPw(false);
    setIsPw2(false);
    setSentCode("");
  };

  const handleClose = () => {
    resetState();
    close();
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {header}
              <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
            </header>
            <div className="wrapper">
              {!isNext ? (
                <div className="verifyMail">
                  <p>가입한 이메일을 입력해주세요.</p>
                  <InputButton
                    height="40px"
                    holder="이메일 입력"
                    btnChild="확인"
                    value={inputEmail}
                    changeEvt={onChangeEmail}
                    active={isEmail}
                    clickEvt={isExist}
                    msg={emailMessage}
                    msgType={isEmail}
                  />
                  <InputButton
                    height="40px"
                    holder="인증번호를 입력 하세요"
                    btnChild="확인"
                    value={inputCode}
                    changeEvt={onChangeEmailCode}
                    active={isCodeSent}
                    clickEvt={checkCode}
                    msg={codeMessage}
                    msgType={isCode}
                  />
                </div>
              ) : (
                <div className="newPw">
                  <p>새로운 비밀번호를 입력해주세요.</p>
                  <Input
                    holder="새 비밀번호 입력"
                    value={inputPw}
                    type="password"
                    msg={pwMessage}
                    msgType={isPw}
                    changeEvt={onChangePw}
                  />
                  <Input
                    holder="비밀번호 다시 입력"
                    value={inputPw2}
                    type="password"
                    msg={pw2Message}
                    msgType={isPw2}
                    changeEvt={onChangePw2}
                  />
                </div>
              )}
            </div>
            <footer>
              {!isNext ? (
                <Button
                  onClick={() => {
                    if (isCode) {
                      setIsNext(true);
                    }
                  }}
                  className={isCode ? "" : "false"}
                >
                  다음
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (isPw2) {
                      chgPw();
                    }
                  }}
                  className={isPw2 ? "" : "false"}
                >
                  변경
                </Button>
              )}
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default FindPwModal;
