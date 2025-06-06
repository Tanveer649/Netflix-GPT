import { IMAGE_CDN_URL } from "../utils/constants";

const MovieCard = ({posterPath}) =>{

    if (!posterPath) {
        console.warn("Missing posterPath");
        return null;
    }
    return(
        <div className=" w-36 md:w-48 pr-4">
            <img alt="Movie Card" src={IMAGE_CDN_URL + posterPath} />
         
        </div>
    );
};

export default MovieCard