import styled from "styled-components";

export const RadioBox = styled.div`
  padding: 10px 0;

  .themeSelectBtn {
    display: flex;
    width: 100%;

    .cineCrew {
      background-color: var(--RED);
    }
    .postCrew {
      background-color: var(--GREY);
      color: var(--BLACK);
    }

    label {
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 2rem;
      font-size: 1em;
      font-weight: 600;
      color: white;
      display: flex;
      align-items: center;
      word-break: keep-all;
      margin-right: 20px;
      accent-color: var(--BLACK);

      // 체크박스 위치 조정
      input[type="radio"] {
        margin: 0 8px 0 0;
        cursor: pointer;
      }
    }
  }
  .typeSelectBtn {
    display: flex;
    width: 100%;
    .online {
      background-color: var(--ORANGE);
    }
    .offline {
      background-color: var(--GREY);
      color: var(--BLACK);
    }
    label {
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 2rem;
      font-size: 1em;
      font-weight: 600;
      color: white;
      display: flex;
      word-break: keep-all;
      margin-right: 20px;
      justify-content: center;
      align-items: center;
      accent-color: var(--BLACK);

      // 체크박스 위치 조정
      input[type="radio"] {
        margin: 0 8px 0 0;
        cursor: pointer;
        padding: 10px;
      }
    }
  }
`;
