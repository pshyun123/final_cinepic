import { useState, useEffect, useRef } from "react";
import MovieBanner from "../component/MovieSearch/MovieBanner";
import MovieList from "../component/MovieSearch/MovieList";

const MovieSearch = () => {
  const [keyword, setKeyword] = useState("");

  // useEffect(() => {
  //   console.log("검색 키워드 : " + keyword);
  // }, [keyword]);

  const [sortBy, setSortBy] = useState("recent");

  const searchCompRef = useRef(null);

  return (
    <>
      <MovieBanner
        setKeyword={setKeyword}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchCompRef={searchCompRef}
      />
      <MovieList
        keyword={keyword}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchCompRef={searchCompRef}
      />
    </>
  );
};
export default MovieSearch;
