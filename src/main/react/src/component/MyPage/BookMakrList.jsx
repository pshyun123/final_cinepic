import { styled } from "styled-components";
import MovieList from "../MovieSearch/MovieList";
import { useRef } from "react";

const BookMarkListComp = styled.section`
  .container {
    h2 {
      font-size: 1.8em;
      font-weight: 600;
      padding-bottom: 80px;
    }
  }
`;

const BookMarkList = () => {
  const searchCompRef = useRef(null);
  return (
    <>
      <BookMarkListComp>
        <div className="container">
          <h2 ref={searchCompRef}>북마크</h2>
          <MovieList sortType="member" searchCompRef={searchCompRef} />
        </div>
      </BookMarkListComp>
    </>
  );
};

export default BookMarkList;
