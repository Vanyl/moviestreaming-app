// * Header with logo and navigation links (TV Shows, Movies, News & Popular, My List)
// * Hero section with a background image and a call to action button
// * List of categories (Netflix originals, Top rated, Popular now, etc.)
// * List of movies and series
import { Outlet, Link } from "react-router-dom";
import CarouselDefault from "../components/Carousel";
import Movie from "../components/Movie";

const Home = () => {
    return (
        <>
         <CarouselDefault/>
         <Movie />
        </>
    )
}

export default Home;