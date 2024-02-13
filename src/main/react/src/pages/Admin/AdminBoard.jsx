import styled from "styled-components";
import CategoryChart from "../../component/Chart/CategoryChart";
import { useState, useEffect, useCallback } from "react";
import MemoizedTr from "../../component/Adminstrator/AdminBoard/TableElement";
import PaginationUtil from "../../util/Pagination/Pagination";
import Modal from "../../util/Modal";
import BoardApi from "../../api/BoardApi";
import useTokenAxios from "../../hooks/useTokenAxios";

const AdminBoardComp = styled.div`
  padding-top: 60px;

  .container {
    min-width: 1200px;
    padding: 40px 30px;
    margin-left: 50px;

    h2 {
      margin-bottom: 50px;
      font-size: 1.7em;
      font-weight: 600;
      // 밑줄
      display: inline-block;
      padding: 0 5px;
      padding-bottom: 14px;
      border-bottom: 3px solid var(--GREY);
    }
    .chartBox {
      margin-bottom: 30px;
    }
    .tableBox {
      width: 100%;
      padding-bottom: 10px;
      overflow-x: auto;
      text-align: center;
      display: inline-block;
      padding: 0 5px;
      padding-bottom: 14px;
      border-bottom: 2px solid var(--GREY);

      table {
        width: 100%;
        max-width: 100%;
        white-space: nowrap;
        overflow-x: scroll;
        padding: 10px;

        thead {
          tr {
            border-radius: 5px;

            th {
              color: var(--BLACK);
              font-weight: 600;
              font-size: 1em;
              background-color: var(--GREY);
              padding: 20px;
              &:first-child {
                border-radius: 10px 0 0 10px;
              }
              &:last-child {
                border-radius: 0 10px 10px 0;
              }
            }
          }
        }
        tbody {
          td {
            padding: 10px;
            color: var(--BLACK);
          }
        }
      }
    }
  }
`;
const AdminBoard = () => {
  const [dataList, setDataList] = useState([]);

  //페이지네이션 관련
  const [totalPage, setTotalPage] = useState(5);
  const [page, setPage] = useState(1);

  // 게시글 api 정의
  const fetchDataList = async (page) => {
    const res = await BoardApi.getAdminBoardList(page);
    if (res.data !== null) {
      setDataList(res.data);
    }
  };
  const getDataList = useTokenAxios(() => fetchDataList(page));
  const getFirstList = useTokenAxios(() => fetchDataList(1));

  // 페이지 api 정의
  const fetchTotalPage = async () => {
    // console.log("fetchTotalPage : ");
    setPage(1);
    const res = await BoardApi.getAdminPages();
    if (res.data !== null) {
      setTotalPage(res.data);
      getFirstList();
    }
  };
  const getTotalPage = useTokenAxios(fetchTotalPage);

  useEffect(() => {
    //클릭된 페이지의 게시글 가져오기
    getDataList();
  }, [page]);
  useEffect(() => {
    // 총페이지 수 가져오는 APi
    // console.log("first rendering");
    getTotalPage();
  }, []);

  // 페이지당 게시글 수
  const itemsPerPage = 10;
  // 현재 페이지의 첫 번째 항목의 인덱스
  const startIndex = (page - 1) * itemsPerPage;
  // 모달
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setRevise("back");
  };

  const handleModal = useCallback((header, msg, type, num) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
    setConfirm(num);
  }, []);

  const [revise, setRevise] = useState(false);
  const [editCategory, setEditCategory] = useState("");
  const [editType, setEditType] = useState("");
  const [editId, setEditId] = useState("");

  // 확인 버튼 클릭
  const clickOk = useCallback(
    (categorySel, typeSel, id) => {
      handleModal("확인", "수정하시겠습니까?", true, 0);
      setEditCategory(categorySel);
      if (categorySel === "무비추천") {
        setEditType("");
      } else {
        setEditType(typeSel);
      }
      setEditId(id);
    },
    [handleModal, setEditCategory, setEditType, setEditId]
  );

  // 삭제 버튼 클릭
  const clickDel = useCallback(
    (id) => {
      handleModal("삭제", "삭제하시겠습니까?", true, 1);
      setEditId(id);
    },
    [handleModal, setEditId]
  );

  // 게시글 이동
  const moveBoard = async () => {
    const res = await BoardApi.updateBoard(editId, editCategory, editType);
    if (res.data) {
      getTotalPage();
    }
  };
  const changeCategory = useTokenAxios(moveBoard);

  // 게시글 삭제
  const deleteBoard = async () => {
    const res = await BoardApi.deleteBoard(editId);
    if (res.data) {
      getTotalPage();
    }
  };
  const delBoard = useTokenAxios(deleteBoard);
  return (
    <>
      <AdminBoardComp>
        <div className="container">
          <h2>게시글 관리</h2>
          <div className="chartBox">
            <CategoryChart />
          </div>
          <div className="tableBox">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>작성자</th>
                  <th>게시글 제목</th>
                  <th>조회수</th>
                  <th>작성 날짜</th>
                  <th>대분류</th>
                  <th>소분류</th>
                  <th>수정</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {/* map으로 반복할 요소 */}
                {dataList &&
                  dataList.map((data, index) => (
                    <MemoizedTr
                      key={data.id}
                      data={data}
                      index={startIndex + index}
                      revise={revise}
                      setRevise={setRevise}
                      clickOk={clickOk}
                      clickDel={clickDel}
                      editId={editId}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {dataList.length !== 0 && (
            <PaginationUtil
              totalPage={totalPage}
              limit={10}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
        <Modal
          open={openModal}
          close={closeModal}
          header={modalHeader}
          children={modalMsg}
          type={modalType}
          confirm={() => {
            if (confirm === 0) {
              changeCategory();
              setModalOpen(false);
              setRevise(true);
            } else if (confirm === 1) {
              closeModal();
              delBoard();
            }
          }}
        />
      </AdminBoardComp>
    </>
  );
};
export default AdminBoard;
