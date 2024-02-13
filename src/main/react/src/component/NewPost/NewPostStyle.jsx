import styled from "styled-components";

export const NewPostComp = styled.section`
  background-color: white;
  .container {
    padding: 4%;

    .postIntro {
      margin-bottom: 30px;

      h2 {
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 1.8em;
      }
      p {
        padding-bottom: 10px;
        font-size: 1.4em;
      }
    }
    .postBox {
      width: 100%;
      border: 1px solid var(--GREY);
      border-radius: 10px;
      padding: 40px;

      .selectTheme {
        margin-bottom: 30px;
        h3 {
          color: var(--BLACK);
          font-weight: 600;
          font-size: 1.3em;
          margin-bottom: 5px;
        }
      }
      .meetingType {
        margin-bottom: 30px;
        h3 {
          color: var(--BLACK);
          font-weight: 600;
          font-size: 1.3em;
          margin-bottom: 5px;
        }
      }
      .author,
      .regDate,
      .postImage {
        display: flex;
        margin-bottom: 40px;
        h3 {
          color: var(--BLACK);
          font-weight: 600;
          font-size: 1.3em;
          width: 100px;
        }
        p {
          color: var(--BLACK);
          font-size: 1.2em;
        }
      }
      .postTitle,
      .contents {
        h3 {
          font-weight: 600;
          font-size: 1.3em;
          margin-bottom: 20px;
          letter-spacing: 8px;
        }
      }
      .postTitle {
        margin-bottom: 30px;
        input {
          background-color: var(--IVORY);
          border: 1px solid var(--GREY);
          width: 100%;
          border-radius: 8px;
          padding: 10px;
          font-size: 1.2em;
        }
      }
      .contents {
        textarea {
          background-color: var(--IVORY);
          border: 1px solid var(--GREY);
          width: 100%;
          border-radius: 10px;
          padding: 10px;
          font-size: 1.2em;
          resize: none;
          height: 250px;
        }
      }
      .uploadImage {
        width: 100%;
        margin-bottom: 30px;

        .imgBox {
          position: relative;
          width: 30%;
          padding-bottom: 30%;
          margin-bottom: 25px;
          border-radius: 5%;
          background-color: var(--GREY);
          overflow: hidden;
          img {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        }
        label {
          padding: 5px 10px;
          color: white;
          border-radius: 5px;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          background-color: var(--RED);
          transition: 0.3s ease-out;
          &:hover {
            background-color: var(--DARKRED);
          }
        }
        input {
          display: none;
        }
      }
    }
    .buttonBox {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      Button {
        margin: 20px;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .container {
      padding: 5% 0%;
      .postIntro {
        text-align: center;
        margin-bottom: 15px;
        .introTop {
          margin-bottom: 15px;
        }
      }

      h2 {
        margin-bottom: 20px;
        font-size: 1.8em;
      }
      .postBox {
        .author,
        .regDate,
        .postImage {
          margin-bottom: 30px;
        }
        .contents {
          flex-direction: column;
          width: 100%;
          textarea {
            width: 100%;
            height: 200px;
          }
        }
        .uploadImage {
          .imgBox {
            position: relative;
            width: 40%;
            padding-bottom: 40%;
            margin-bottom: 25px;
            border-radius: 5%;
            background-color: var(--GREY);
            overflow: hidden;
            img {
              position: absolute;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
`;
