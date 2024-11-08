import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { PlayIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const img_780 = 'https://image.tmdb.org/t/p/w1280'
const unavailable = 'https://www.movienewz.com/img/films/poster-holder.jpg'

const fetchMovieLogo = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_image_language=en,es,null`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie images');
    }
    const data = await response.json();
    const logos = data.logos;
    return logos.length > 0 ? `https://image.tmdb.org/t/p/w500/${logos[0].file_path}` : unavailable;
};

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = {
        sm: 2,
        md: 3,
        lg: 4
    };

    const getItemsPerPage = () => {
        if (window.innerWidth >= 1024) return itemsPerPage.lg;
        if (window.innerWidth >= 768) return itemsPerPage.md;
        return itemsPerPage.sm;
    };

    const [currentItemsPerPage, setCurrentItemsPerPage] = useState(getItemsPerPage());

    useEffect(() => {
        const handleResize = () => {
            setCurrentItemsPerPage(getItemsPerPage());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNext = () => {
        if (currentIndex < movies.length - currentItemsPerPage) {
            setCurrentIndex(currentIndex + currentItemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - currentItemsPerPage);
        }
    };

    const fetchTrending = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
            if (!response.ok) {
                throw new Error('Failed to fetch trending data');
            }
            const dataJson = await response.json();
            // setMovies(dataJson.results);
            const moviesWithLogos = await Promise.all(
                dataJson.results.map(async (movie) => {
                    const logo = await fetchMovieLogo(movie.id);
                    return { ...movie, logo }; // Add the logo to the movie object
                })
            );
            setMovies(moviesWithLogos);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    const renderTrendingMovieCard = (movie) => {
        const { logo, title, poster_path, backdrop_path, id } = movie;

        return (
            <>
                <Card className="group relative sm:w-[220px] md:w-[350px] md:h-[450px] md:hover:w-[650px] h-[250px] sm:h-[350px] overflow-hidden bg-transparent transition-all duration-300 ease-in-out">
                    <CardHeader floated={false} shadow={false} className="relative h-full">
                        <img
                            src={poster_path ? `https://image.tmdb.org/t/p/w780/${poster_path}` : unavailable}
                            alt={title}
                            className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                        />
                    </CardHeader>

                    {/* expanding content */}
                    <div className="absolute top-0 left-0 w-full h-full flex opacity-0 transition-all duration-300 ease-in-out md:group-hover:opacity-100 md:group-hover:w-full">
                        <CardHeader floated={false} shadow={false} className="relative h-full">
                            <img
                                src={backdrop_path ? `${img_780}/${backdrop_path}` : unavailable}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </CardHeader>

                        <CardBody className="absolute flex flex-col bottom-4 left-4 right-4 p-4 sm:flex">
                            <Typography color="white" className="font-bold text-xs sm:text-sm md:text-2xl">
                                {logo && logo !== unavailable ? (
                                    <img
                                        src={logo}
                                        alt={title}
                                        className="h-10 w-auto object-contain"
                                    />
                                ) : (title)}
                            </Typography>
                            <CardFooter className="flex items-center gap-2 mt-4">
                                <Link to={`/movie/${id}`}>
                                    <Button className="text-white text-base font-bold bg-gray-800/50 flex items-center gap-2 hover:bg-white hover:text-black px-4 py-4 transition-all">
                                        <PlayIcon className="h-5 w-5" /> Play
                                    </Button>
                                </Link>
                                <Button size="lg" color="white" className="text-white p-4 md:bg-transparent lg:bg-gray-800/50 hover:bg-white hover:text-black rounded-full hidden md:flex">
                                    <PlusIcon className="h-7 w-7" />
                                </Button>
                                <Button size="lg" color="white" className="text-white p-4 md:bg-transparent lg:bg-gray-800/50 hover:bg-white hover:text-black rounded-full hidden md:flex">
                                    <InformationCircleIcon className="h-7 w-7" />
                                </Button>
                            </CardFooter>
                        </CardBody>
                    </div>
                </Card>
            </>
        );
    };

    return (
        <div>
            <h1 className="text-lg text-white font-bold">Trending Movies</h1>
            <div className="flex place-content-evenly overflow-hidden  space-x-4" style={{ width: '100%' }} >
                {movies.slice(currentIndex, currentIndex + currentItemsPerPage).map(movie => (
                    <div key={movie.id} className="flex-shrink-0">
                        {renderTrendingMovieCard(movie)}
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="relative group bg-gray-900/50 text-white h-full px-4 py-2 m-[-25px]  rounded pointer-events-auto"
                >
                    < ChevronLeftIcon className="h-5 w-5 transition-transform duration-300 ease-in-out transform scale-100 group-hover:scale-150" />
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex >= movies.length - itemsPerPage}
                    className="relative group bg-gray-900/50 text-white h-full px-4 py-2 m-[-25px] rounded pointer-events-auto"
                >
                    < ChevronRightIcon className="h-5 w-5 transition-transform duration-300 ease-in-out transform scale-100 group-hover:scale-150" />
                </button>
            </div>
        </div>
    );
}

export default TrendingMovies