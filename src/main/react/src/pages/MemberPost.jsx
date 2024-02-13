import CardList from "../component/Board/CardList";
import MempostSort from "../component/MemberPost/MempostSort";
import { useState, useEffect } from "react";

const MemberPost = () => {
  const [selType, setSelType] = useState("written");

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (num) => {
    switch (num) {
      case 0:
        setSelType("written");
        break;
      case 1:
        setSelType("comment");
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    console.log("선택값 : " + selType);
    setIsLoading(true);
  }, [selType]);
  return (
    <>
      <MempostSort selType={selType} setSelType={onChange} />
      <CardList
        category="member"
        type={selType}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
};
export default MemberPost;
