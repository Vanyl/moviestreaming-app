import Genres from "../components/Genres";
import CarouselDefault from "../components/Carousel";
import TrendingMovies from "../components/TrendingMovies";

const Movies = () => {

  const media = "movie"
  return (
    <>
      <CarouselDefault api={'https://api.themoviedb.org/3/movie/now_playing'} />
      <div className="max-w-7xl mx-auto px-4 pb-4 space-y-10">
        <TrendingMovies />
        < Genres media={media} />
      </div>
    </>
  )
}

export default Movies;