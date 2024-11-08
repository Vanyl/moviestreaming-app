// * Header with logo and navigation links (TV Shows, Movies, News & Popular, My List)
// * Hero section with a background image and a call to action button
// * List of categories (Netflix originals, Top rated, Popular now, etc.)
// * List of movies and series
import CarouselDefault from "../components/Carousel";
import TrendingMovies from "../components/TrendingMovies";
import TrendingSeries from "../components/TrendingSeries";


const Home = () => {
    return (
        <>
            <CarouselDefault api={'https://api.themoviedb.org/3/trending/all/week'}/>
            <div className="max-w-7xl mx-auto px-4 pb-4 space-y-10">
            <TrendingMovies />
            <TrendingSeries />
            </div>
        </>
    );
};

export default Home;