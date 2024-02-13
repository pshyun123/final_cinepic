import { styled } from "styled-components";

const MempostSortComp = styled.section`
  .container {
    text-align: center;
    margin-bottom: 100px;
  }

  button {
    padding-top: 130px;
    background: none;
    border: none;
    color: #333333;
    transition: 0.1s ease-in;
    font-size: 22px;
    font-weight: 600;

    &:hover {
      cursor: pointer;
    }
    &.recent {
      padding-left: 10px;
      margin-right: 5px;
    }
    &.selected {
      color: var(--RED);
    }
  }
`;

const MempostSort = ({ selType, setSelType }) => {
  return (
    <MempostSortComp>
      <div className="container">
        {/* 수정 */}
        <button
          className={`written ${selType === "written" ? "selected" : ""}`}
          onClick={() => setSelType(0)}
        >
          작성글
        </button>
        <button
          className={`comment ${selType === "comment" ? "selected" : ""}`}
          onClick={() => setSelType(1)}
        >
          작성댓글
        </button>
      </div>
    </MempostSortComp>
  );
};

export default MempostSort;
