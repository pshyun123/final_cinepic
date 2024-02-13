import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import Button from "../../../util/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileImg from "../../../util/ProfileImg";

const TrComp = styled.tr`
  vertical-align: middle;
  td {
    padding: 10px;
    vertical-align: middle;
    &.center {
      text-align: center;
    }
    &.profile {
      .wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .imgBox {
          width: 30px;
          padding-bottom: 30px;
          margin-right: 5px;
          position: relative;
          border-radius: 100%;
          overflow: hidden;
          background-color: var(--GREY);
          svg {
            width: 80%;
            height: 80%;
            position: absolute;
            top: 20%;
            left: 10%;
            color: var(--DARKGREY);
          }
        }
      }
    }
    &.selectBox {
      select {
        &:disabled {
          opacity: 1;
        }
        border: 1px solid var(--GREY);
        border-radius: 2px;
        padding: 6px;
        font-weight: 600;
        option {
        }
      }
    }
  }
`;

const Tr = ({ data, index, revise, setRevise, clickOk, clickDel }) => {
  const [confirmRevise, setConfirmRevise] = useState(false);
  const [categorySel, setCategorySel] = useState(data.categoryName);
  const [categoryActive, setCategoryActive] = useState(true);
  const [typeSel, setTypeSel] = useState(data.gatherType);
  const [gatherActive, setGatherActive] = useState(true);

  // 날짜 가져오는 형식
  const toDate = new Date(data.regDate);
  const regDate = toDate.toISOString().split("T")[0];

  // 첫 렌더링(마운트) 상태 여부를 useRef를 사용하여 관리
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!isInitialRender.current) {
    } else {
      isInitialRender.current = false;
    }
  }, [categorySel, typeSel]);

  // 카테고리 정보, 온/오프라인 상태 관리
  useEffect(() => {
    if (revise === true || revise === "back") {
      setConfirmRevise(false);
      setRevise(false);
      setCategoryActive(true);
      setGatherActive(true);
      if (revise === "back") {
        setCategorySel(data.categoryName);
        setTypeSel(data.gatherType);
      }
    }
  }, [revise]);

  // 수정버튼
  const clickRevise = () => {
    setCategoryActive(false);
    setGatherActive(false);
    setConfirmRevise(true);
  };

  // 대분류 변경
  const onChangeCategory = (e) => {
    setCategorySel(e.target.value);
    // 대분류
    if (e.target.value !== "씨네크루") {
      // gatherActive 상태를 false로 설정하여 소분류 선택 상자를 비활성화
      setGatherActive(false);
    } else {
      // 대분류가 씨네크루가 아닌 경우
      // gatherActive 상태를 false로 설정하여 소분류 선택 상자를 비활성화
      setGatherActive(false);

      // gatherType 빈 문자열인 경우
      if (data.gatherType === "") {
        // 소분류를 오프라인으로 설정
        setTypeSel("오프라인");
      }
      // gatherType이 "선택"이 아닌 경우 이전 값을 유지
      else
        setTypeSel((prevType) => (prevType === "선택" ? "오프라인" : prevType));
    }
  };

  // 소분류 변경
  const onChangeType = (e) => {
    // 소분류 선택 상자의 값이 변경될 때마다 선택된 값으로 setTypeSel을 호출, 상태 업데이트
    setTypeSel(e.target.value);
  };

  return (
    <TrComp>
      {/* 숫자 자동증가 */}
      <td className="center">{index + 1}</td>
      <td className="profile">
        <span className="wrapper">
          <span className="imgBox">
            {data.memberImage && data.memberImage ? (
              <ProfileImg $imgUrl={data.memberImage} />
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </span>
          <span>{data.alias}</span>
        </span>
      </td>
      <td>{data.title}</td>
      <td className="center">{data.count}</td>
      <td className="center">{regDate}</td>
      {/* 대분류 */}
      <td className="selectBox">
        <select
          name="category"
          disabled={categoryActive}
          value={categorySel}
          onChange={onChangeCategory}
        >
          <option value="선택" hidden>
            선택
          </option>
          <option value="씨네크루">씨네크루</option>
          <option value="크루후기">크루후기</option>
        </select>
      </td>
      {/* 소분류 */}
      <td className="selectBox">
        <select
          name="gather"
          disabled={gatherActive}
          value={typeSel}
          onChange={onChangeType}
        >
          <option value="선택" hidden>
            선택
          </option>
          <option value="오프라인">오프라인</option>
          <option value="온라인">온라인</option>
        </select>
      </td>
      <td>
        {confirmRevise ? (
          <Button
            children={"확인"}
            back="var(--DARKRED)"
            fontSize=".8em"
            width="80px"
            height="30px"
            active={true}
            clickEvt={() => {
              clickOk(categorySel, typeSel, data.id);
            }}
          />
        ) : (
          <Button
            children={"수정"}
            front="var(--DARKGREY)"
            back="var(--DARKRED)"
            fontSize=".8em"
            width="80px"
            height="30px"
            active={true}
            clickEvt={clickRevise}
          />
        )}
      </td>
      <td>
        <Button
          children={"삭제"}
          back="var(--DARKRED)"
          fontSize=".8em"
          width="80px"
          height="30px"
          active={true}
          clickEvt={() => clickDel(data.id)}
        />
      </td>
    </TrComp>
  );
};

const MemoizedTr = React.memo(Tr, (prevProps, nextProps) => {
  const isTargetTr = prevProps.data.id === nextProps.editId;

  return (
    (isTargetTr && prevProps.revise === nextProps.revise) ||
    (!isTargetTr &&
      prevProps.confirmRevise === nextProps.confirmRevise &&
      prevProps.categorySel === nextProps.categorySel &&
      prevProps.typeSel === nextProps.typeSel &&
      prevProps.categoryActive === nextProps.categoryActive &&
      prevProps.gatherActive === nextProps.gatherActive &&
      prevProps.data.id === nextProps.data.id)
  );
});
export default MemoizedTr;
