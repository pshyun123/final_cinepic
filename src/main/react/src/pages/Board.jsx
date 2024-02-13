import { useNavigate, useParams } from "react-router-dom";
import BoardBanner from "../component/Board/BoardBanner";
import CardList from "../component/Board/CardList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserStore";

const Board = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const context = useContext(UserContext);
  const { loginStatus } = context;

  // 카테고리 / 키워드 관리
  const [categorySel, setCategorySel] = useState("");
  const [keyword, setKeyword] = useState("");

  // 백 여러번 호출 방지
  const [isLoading, setIsLoading] = useState(false);

  // 로그인 x → 로그인 페이지로 이동
  useEffect(() => {
    if (!loginStatus) {
      navigate("/login"); // 로그인 하지 않았다면 로그인 페이지로 이동
    }
  }, []);

  // 카테고리
  useEffect(() => {
    switch (category) {
      case "gather":
        setCategorySel("씨네크루");
        break;
      case "recap":
        setCategorySel("크루후기");
        break;
      default:
        navigate("/notfound");
        break;
    }
  }, [category, navigate]); // navigate 넣는게 맞나..
  return (
    <>
      <BoardBanner
        id={category}
        keyword={keyword}
        setKeyword={setKeyword}
        setIsLoading={setIsLoading}
      />
      <CardList
        category={categorySel}
        keyword={keyword}
        setKeyword={setKeyword}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
};
export default Board;
