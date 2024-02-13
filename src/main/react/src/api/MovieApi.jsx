import axios from "axios";
import Common from "../util/Common";

const MovieApi = {
  getMovieList: async (keyword, sortType, page, size) => {
    return await axios.get(Common.CP_DOMAIN + `/movies/searchlist`, {
      params: {
        keyword: keyword,
        sortType: sortType,
        page: page,
        size: size,
      },
    });
  },
};
export default MovieApi;
