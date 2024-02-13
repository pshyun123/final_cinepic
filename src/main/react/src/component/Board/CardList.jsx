import styled from "styled-components";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ToggleButton from "./ToggleBtn";
import PaginationUtil from "../../util/Pagination/Pagination";
import BoardApi from "../../api/BoardApi";
import useTokenAxios from "../../hooks/useTokenAxios";

const CardListComp = styled.section`
  padding-bottom: 70px;
  .container {
    .sortArea {
      display: flex;
      font-weight: 500;
      font-size: 0.9rem;
      margin-bottom: 60px;
      justify-content: flex-end;
      li {
        position: relative;
        color: var(--GREY);
        font-size: 1.1em;
        margin-left: 24px;
        cursor: pointer;
        &.active {
          color: var(--BLACK);
        }
        &:last-child {
          &::after {
            content: "";
            width: 2px;
            height: 100%;
            background-color: var(--GREY);
            position: absolute;
            top: 1px;
            left: -11px;
            cursor: default;
          }
        }
      }
    }
    .boardMap {
      .noData {
        text-align: center;
        line-height: 1.8;
        padding-bottom: 100px;
        p {
          font-size: 1.4em;
          color: #888;
        }
      }
      .pagination {
        margin-top: 50px;
      }
    }
  }
`;

const CardList = ({
  category,
  keyword,
  type,
  setKeyword,
  isLoading,
  setIsLoading,
}) => {
  const navigate = useNavigate();
  // 페이지네이션
  const [totalPage, setTotalPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const [boardData, setBoardData] = useState([]);
  const [gatherType, setGatherType] = useState("온라인");

  const handleSetGatherType = useCallback(
    (newGatherType) => {
      setGatherType(newGatherType);
      setIsLoading(true);
    },
    [setGatherType]
  );

  // 게시글 리스트
  const fetchBoardList = async (page) => {
    const res = await BoardApi.getBoardList(
      page,
      sortBy,
      keyword,
      category,
      gatherType
    );
    if (res.data !== null) {
      setBoardData(res.data);
    }
    // 리스트 불러오는 중이면 true, 로딩 끝나면 false
    setIsLoading(false);
  };
  const getFirstPage = useTokenAxios(() => fetchBoardList(1));
  const getSelPage = useTokenAxios(() => fetchBoardList(page));

  // 페이지 수
  const fetchTotalPage = async (page) => {
    const res = await BoardApi.getTotalPage(keyword, category, gatherType);
    if (res.data !== null) {
      setTotalPage(res.data);
      setPage(page);
      setKeyword("");
      await getFirstPage();
    }
  };
  const getTotalPage = useTokenAxios(() => fetchTotalPage(1));

  // 회원 게시글 리스트
  const fetchMemBoardList = async (page) => {
    setPage(1);
    const res = await BoardApi.getMemBoardList(page, type);
    if (res.data !== null) {
      setBoardData(res.data);
    }
    setIsLoading(false);
  };
  const getMemBoardList = useTokenAxios(() => fetchMemBoardList(page));

  // 회원 게시글 페이지 수
  const fetchMemTotalPage = async () => {
    setPage(1);
    const res = await BoardApi.getMemTotalPage(type);
    if (res.data !== null) {
      setTotalPage(res.data);
      getMemBoardList();
    }
  };
  const getMemtotalPage = useTokenAxios(fetchMemTotalPage);

  // 새로운 조건의 리스트를 불러와야 하는 경우
  useEffect(() => {
    if (isLoading) {
      category === "member" ? getMemtotalPage() : getTotalPage();
    }
  }, [isLoading]);

  // 페이지만 변경하는 경우
  useEffect(() => {
    category === "member" ? getMemBoardList() : getSelPage();
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
  }, [category]);

  return (
    <>
      <CardListComp>
        <div className="container">
          <div className="type_filter">
            {category !== "member" && (
              <ToggleButton
                onChange={handleSetGatherType}
                gatherType={gatherType}
              />
            )}
          </div>
          {category !== "member" && (
            <ul className="sortArea">
              <li
                className={sortBy === "recent" ? "active" : ""}
                onClick={() => {
                  setSortBy("recent");
                  setIsLoading(true);
                }}
              >
                최신순
              </li>
              <li
                className={sortBy === "former" ? "active" : ""}
                onClick={() => {
                  setSortBy("former");
                  setIsLoading(true);
                }}
              >
                과거순
              </li>
            </ul>
          )}

          <div className="boardMap">
            {boardData &&
              boardData.map((data) => <Card key={data.id} data={data} />)}

            {boardData && boardData.length === 0 && (
              <div className="noData">
                <p>
                  작성된 {`${type === "comment" ? "댓글" : "게시글"}`}이
                  없습니다
                </p>
                <p>첫 게시글을 작성해 보세요!</p>
              </div>
            )}

            {boardData && boardData.length > 0 && (
              <PaginationUtil
                totalPage={totalPage}
                limit={10}
                page={page}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </CardListComp>
    </>
  );
};
export default CardList;
