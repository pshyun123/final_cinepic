import styled from "styled-components";

const ActorComp = styled.div`
  padding: 5%;
  font-size: 1.1em;
  .line_up {
    margin-bottom: 3%;
    display: flex;
    line-height: 2em;
    .title {
      width: 15%;
      min-width: 80px;
      color: var(--GREY);
      font-weight: 600;
    }
    p:nth-child(2) {
      width: 80%;
    }
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.3em;
    .lind_up {
      p {
      }
      span {
        line-height: 3em;
      }
    }
  }
`;

const TabActor = ({ movieDetail }) => {
  return (
    <>
      <ActorComp>
        <div className="line_up">
          <p className="title">감독</p>
          <p>{movieDetail.movieDirector}</p>
        </div>
        <div className="line_up">
          <p className="title">출연 배우</p>
          <p>{movieDetail.movieActors}</p>
        </div>
      </ActorComp>
    </>
  );
};
export default TabActor;
