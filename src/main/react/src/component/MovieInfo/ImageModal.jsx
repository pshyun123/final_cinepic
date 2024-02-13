import { styled } from "styled-components";
import Button from "../../util/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ImgModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 996;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }
  .modal_header {
    width: 90%;
    margin: 0 auto;

    padding: 30px;
    animation: modal-show 0.3s;
    /* background-color: pink; */
    overflow: hidden;
    position: relative;

    h3 {
      font-size: 26px;
      font-weight: 400;
      margin-bottom: 20px;
      color: var(--IVORY);
      position: fixed;
      top: 22px;
      left: 26px;
      @media only screen and (max-width: 768px) {
        font-size: 20px;
      }
    }
    .close_btn {
      font-size: 36px;
      cursor: pointer;

      position: fixed;
      top: 22px;
      right: 26px;
      svg {
        color: var(--IVORY);
      }
      @media only screen and (max-width: 768px) {
        font-size: 20px;
      }
    }
    .input_box {
      width: 100%;
      text-align: center;
      .file_box {
        overflow: hidden;
        p {
          margin-bottom: 20px;
        }
        img {
          /* width: 40%; */
          display: block;
          max-width: 50vw;
          max-height: 80vh;
          margin: 20px auto;
          @media only screen and (max-width: 768px) {
            max-width: 80vw;
          }
        }
      }
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ImageModal = (props) => {
  const { open, close, movieTitle, movieImage } = props;

  return (
    <ImgModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={() => {
          close();
        }}
      >
        <section className="modal_header">
          <h3>{movieTitle}</h3>
          <div
            className="close_btn"
            onClick={() => {
              close();
            }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="m-menu"
              onClick={close}
            />
          </div>

          <div className="input_box">
            <div className="file_box">
              <img
                src={movieImage}
                alt="이미지를 불러올 수 없습니다."
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </section>
      </div>
    </ImgModalStyle>
  );
};

export default ImageModal;
