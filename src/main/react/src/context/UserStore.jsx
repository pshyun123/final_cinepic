import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  // 로그인 여부
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") || ""
  );

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  // 취향 등록 여부
  const [isPrefer, setIsPrefer] = useState(
    localStorage.getItem("isPrefer") || ""
  );
  useEffect(() => {
    localStorage.setItem("isPrefer", isPrefer);
  }, [isPrefer]);

  // 멤버쉽 여부
  const [isMembership, setIsMembership] = useState(
    localStorage.getItem("isMembership") || ""
  );
  useEffect(() => {
    localStorage.setItem("isMembership", isMembership);
  }, [isMembership]);

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        isPrefer,
        setIsPrefer,
        isMembership,
        setIsMembership,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
