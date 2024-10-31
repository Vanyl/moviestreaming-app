import Genres from "../components/Genres";
import CarouselDefault from "../components/Carousel";
import TrendingSeries from "../components/TrendingSeries";

const Series = () => {
  const media = "tv"

  return (
    <>
      <CarouselDefault api={'https://api.themoviedb.org/3/tv/on_the_air'} />
      <div className="max-w-7xl mx-auto px-4 pb-4 space-y-10">
        <TrendingSeries />
        < Genres media={media} />
      </div>
    </>
  );
};

export default Series;