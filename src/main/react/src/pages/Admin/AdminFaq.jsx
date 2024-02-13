import { styled } from "styled-components";
import Button from "../../util/Button";
import FaqTr from "../../component/Adminstrator/AdminFaq/FaqElement";
import EditFaqModal from "../../component/Adminstrator/AdminFaq/EditFaqModal";
import Modal from "../../util/Modal";
import FaqApi from "../../api/FaqApi";
import useTokenAxios from "../../hooks/useTokenAxios";
import { useEffect, useState } from "react";

const AdminFaqComp = styled.div`
  padding-top: 8%;

  .container {
    margin: 0;
    margin-left: 50px;
    /* border: 1px solid red; */
    h2 {
      font-size: 1.7em;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 50px;
      padding: 0 5px;
      padding-bottom: 14px;
      border-bottom: 3px solid var(--GREY);
    }

    .tableBox {
      border: 1px solid var(--GREY);
      border-radius: 10px;
      width: 100%;
      padding: 40px 30px;
      padding-bottom: 14px;
      overflow-x: auto;

      table {
        width: 100%;
        max-width: 100%;
        white-space: nowrap;
        overflow-x: scroll;
        margin-bottom: 20px;

        thead {
          tr {
            border-radius: 10px;
            th {
              color: #333333;
              font-size: 1.1em;
              font-weight: 600;
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
        }
      }
    }
  }
  .addbutton {
    display: flex;
    justify-content: end;
    border-top: 2px solid var(--GREY);
    padding-top: 30px;
    margin-top: 20px;
  }
`;

const AdminFaq = () => {
  const [faqData, setFaqData] = useState([]);

  const [titleVal, setTitleVal] = useState("");
  const [contentVal, setContentVal] = useState("");

  const [editId, setEditId] = useState("");

  // 새 faq 생성 관련
  const [openFaqModal, setFaqModalOpen] = useState(false);
  const [faqType, setFaqType] = useState("");

  const closeFaqModal = () => {
    setFaqModalOpen(false);
  };

  const openEdit = () => {
    setFaqModalOpen(true);
    setFaqType("edit");
  };

  const changeTitleInput = (e) => {
    setTitleVal(e.target.value);
  };

  const changeContentInput = (e) => {
    setContentVal(e.target.value);
  };

  //리스트 불러오기
  const fetchFaqList = async () => {
    const res = await FaqApi.getFaqList();
    if (res.data !== null) {
      setFaqData(res.data);
      console.log("Faq리스트 가져옴");
    }
  };

  const bringData = useTokenAxios(fetchFaqList);

  useEffect(() => {
    console.log("titleVal : " + titleVal);
    console.log("contentVal : " + contentVal);
    console.log("editId : " + editId);
  }, [titleVal, contentVal, editId]);

  useEffect(() => {
    bringData();
  }, []);

  // 삭제 모달

  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  // 모달 닫기
  const closeModal = (num) => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  const deleteFaq = async () => {
    const res = await FaqApi.deleteFaq(editId);
    if (res.data) {
      console.log("faq 삭제 성공");
      closeModal();
      bringData();
    }
  };
  const delFaq = useTokenAxios(deleteFaq);

  //더미데이터 넣기
  // const faqData = [
  //   {
  //     faqId: 1,
  //     faqQuestion: "씨네픽은 어떤 서비스를 제공하나요?",
  //     faqAnswer: "테스트입니다~",
  //   },
  //   { faqId: 1, faqQuestion: "씨네픽은 어떤 서비스를 제공하나요?" },
  //   { faqId: 1, faqQuestion: "씨네픽은 어떤 서비스를 제공하나요?" },
  //   { faqId: 1, faqQuestion: "씨네픽은 어떤 서비스를 제공하나요?" },
  // ];

  // useEffect(() => {
  //   setFaqData(testData);
  // }, []);

  return (
    <>
      <AdminFaqComp>
        <div className="container">
          <h2>FAQ 관리</h2>
          <div className="tableBox">
            <table>
              <thead className="">
                <tr>
                  <th>No.</th>
                  <th>제목</th>
                  <th>수정</th>
                  <th>삭제</th>
                </tr>
              </thead>

              <tbody>
                {/* map으로 반복할 요소 */}
                {faqData &&
                  faqData.map((data, index) => (
                    <FaqTr
                      key={data.faqId}
                      data={data}
                      index={index}
                      editModal={openEdit}
                      setTitle={setTitleVal}
                      setContent={setContentVal}
                      setId={setEditId}
                      deleteModal={() => {
                        handleModal("삭제", "삭제하시겠습니까?", true);
                      }}
                    ></FaqTr>
                  ))}
              </tbody>
            </table>
            <div className="addbutton">
              <Button
                children={"추가"}
                fontSize=".8em"
                width="80px"
                height="30px"
                front={"var(--DARKRED)"}
                back={"var(--RED)"}
                color={"var(--IVORY)"}
                active={true}
                clickEvt={() => {
                  setFaqModalOpen(true);
                  setFaqType("new");
                  setTitleVal("");
                  setContentVal("");
                }}
              />
            </div>
          </div>
        </div>
        <EditFaqModal
          open={openFaqModal}
          close={closeFaqModal}
          type={faqType}
          titleVal={titleVal}
          contentVal={contentVal}
          onChangeTitle={changeTitleInput}
          onChangeContent={changeContentInput}
          editId={editId}
          bringData={bringData}
        />
        <Modal
          open={openModal}
          close={closeModal}
          header={modalHeader}
          children={modalMsg}
          type={modalType}
          confirm={() => {
            delFaq();
          }}
        />
      </AdminFaqComp>
    </>
  );
};

export default AdminFaq;
