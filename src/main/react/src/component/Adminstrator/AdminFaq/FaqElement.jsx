import { styled } from "styled-components";
import Button from "../../../util/Button";

const TrComp = styled.tr`
  vertical-align: middle;
  td {
    padding: 10px;
    vertical-align: middle;
    &.center {
      text-align: center;
    }
    &.btn {
      span {
        display: flex;
        justify-content: center;
      }
    }
  }
`;

const FaqTr = ({
  data,
  index,
  editModal,
  setTitle,
  setContent,
  setId,
  onDelete,
  deleteModal,
}) => {
  // console.log(data);

  return (
    <>
      <TrComp>
        <td className="center">{index + 1}</td>
        <td>{data.faqQuestion}</td>
        <td className="btn">
          <span>
            <Button
              children={"수정"}
              fontSize=".8em"
              width="80px"
              height="30px"
              front="var(--DARKGREY)"
              active={true}
              clickEvt={() => {
                editModal();
                setTitle(data.faqQuestion);
                setContent(data.faqAnswer);
                setId(data.faqId);
              }}
              faqId={data.faqId}
            />
          </span>
        </td>

        <td className="btn">
          <span>
            <Button
              children={"삭제"}
              fontSize=".8em"
              width="80px"
              height="30px"
              active={true}
              clickEvt={() => {
                setId(data.faqId);
                deleteModal();
              }}
            />
          </span>
        </td>
      </TrComp>
    </>
  );
};

export default FaqTr;
