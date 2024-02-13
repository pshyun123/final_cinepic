import styled from "styled-components";
const CinePickComp = styled.section`
  .container {
    width: 100%;
    .cineTitle {
      h3 {
        font-size: 1.5rem;
        font-weight: 400;
        padding-top: 100px;
        /* padding: 100px 40px 0px 40px; */

        span {
          font-weight: 600;
        }
      }
    }
    .pickMovieBox {
      width: 100%;
      padding: 40px 40px 100px;
      /* border: 1px solid blue; */
      display: flex;
      .onePickBox {
        /* border: 1px solid red; */
        width: 30%;
        button {
          display: block;
          margin: 0 auto;
          margin-top: 40px;
        }

        .movieCard {
          position: relative;
          border-radius: 5px;
          margin-bottom: 15px;
          box-shadow: 4px 5px 10px rgb(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s;
          &:hover {
            transform: scale(1.05);
          }

          .label {
            width: 30%;
            position: absolute;
            top: -5px;
            z-index: 1;
            transition: transform 0.3s ease;
          }
        }
      }
      .rightSideBox {
        width: 70%;
        .textBox {
          padding: 5px 0 0 50px;

          .genre {
            font-size: 1.5em;
            font-weight: 600;
          }
          p {
            color: var(--DARKGREY);
            margin-bottom: 10px;
          }
          .story {
            line-height: 1.6;
            font-size: 1.2em;
            margin-bottom: 30px;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
          }
        }

        .otherMovieBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0 0 30px 40px;

          .movieCard {
            width: 28%;
            position: relative;
            border-radius: 5px;
            margin-bottom: 15px;
            box-shadow: 4px 5px 10px rgb(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.3s;
            &:hover {
              transform: scale(1.05);
            }

            .label {
              width: 30%;
              position: absolute;
              top: -2px;
              z-index: 1;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 991px) {
    .container {
      .cineTitle {
        h3 {
          padding: 60px 20px 0px 20px;
        }
      }
      .pickMovieBox {
        .rightSideBox {
          .textBox {
            .genre {
              font-size: 1.3em;
            }
            .story {
              font-size: 1em;
            }
          }
          .otherMovieBox {
            padding: 0 0 20px 40px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      .cineTitle {
        h3 {
          padding-left: 8%;
          font-size: 1.9em;
          padding-bottom: 15px;
        }
      }
      .pickMovieBox {
        padding: 25px 25px 60px;
        flex-direction: column;
        align-items: center;
        .onePickBox {
          width: 60%;
          button {
            /* width: 150px; */
            margin-top: 40px;
            font-size: 1.3em;
          }
        }
        .rightSideBox {
          width: 80vw;
          .textBox {
            padding: 0 0 0 0px;
            .genre {
              font-size: 1.7em;
              /* border: 1px solid red; */
              padding: 30px 0 20px 0;
            }
            .story {
              font-size: 1.5em;
              line-height: 1.6;
              margin-bottom: 10px;
            }
          }
          .otherMovieBox {
            display: none;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .container {
      .cineTitle {
        h3 {
          padding-bottom: 10px;
        }
      }
      .pickMovieBox {
        padding: 25px 25px 50px;
        flex-direction: column;
        align-items: center;
        .onePickBox {
          width: 60%;
        }
        .rightSideBox {
          .textBox {
            padding: 0 0 0 0px;

            .story {
              font-size: 1.4em;
              line-height: 1.6;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .container {
      .cineTitle {
        h3 {
          font-size: 1.6em;
        }
      }
      .pickMovieBox {
        .onePickBox {
          width: 70%;
          button {
            width: 150px;
            font-size: 1.1em;
          }
        }
        .rightSideBox {
          .textBox {
            .genre {
              /* border: 1px solid orange; */
              font-size: 1.5em;
              /* padding: 20px 0; */
            }
            .story {
              font-size: 1.2em;
              line-height: 1.6;
            }
          }
        }
      }
    }
  }
`;
export default CinePickComp;
