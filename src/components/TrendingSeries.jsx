import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { PlayIcon } from "@heroicons/react/24/solid"
import Slider from './Slider.jsx'

const TrendingSeries = () => {
    const img_300 = 'https://image.tmdb.org/t/p/w780'
    const unavailable = 'https://www.movienewz.com/img/films/poster-holder.jpg'
    const [series, setSeries] = useState([]); //initializing the state variable as an empty array

    const fetchTrending = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
            if (!response.ok) {
                throw new Error('Failed to fetch trending data');
            }
            const dataJson = await response.json();  // fetching data from API in JSON Format
            setSeries(dataJson.results); //storing that data in the state
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    const truncate = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };
    const renderTrendingSerieCard = (serie) => {
        const { title, overview, backdrop_path, id, first_air_date } = serie;
        return (
            <div className="relative">
                <Card className="group max-w-[24rem] overflow-hidden card mt-6 bg-black hover:z-10 hover:scale-105 hover:absolute hover:top-0 hover:left-0 transform transition duration-300 ease-in-out origin-center">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="blue-gray"
                        className="m-0 rounded-none card-header relative h-32"
                    >
                        <img
                            src={backdrop_path ? `${img_300}/${backdrop_path}` : unavailable}
                            alt={title}
                            className="h-full w-full object-cover object-contain"
                        />
                    </CardHeader>
                    <CardBody className="hidden group-hover:block">
                        <Typography className="mb-2 text-lg text-white font-bold">
                            {title}
                        </Typography>
                        <Typography className="text-xs font-semibold">{first_air_date}</Typography>
                        <Typography variant="lead" className="flex text-xs items-center justify-evenly serie text-white mt-3 font-semibold">
                            {truncate(overview, 100)}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0 pb-0 mb-5 flex justify-center items-center hidden group-hover:flex">
                        <Link to={`/serie/${id}`}>
                            <Button className="text-white w-full bg-gray-800 flex justify-item items-center gap-1 hover:bg-white hover:text-black">
                                <PlayIcon className="h-5 w-5" />Lecture
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    };

    return (
        <div>
            <h1 className="text-lg text-white font-bold">Trending TV Shows</h1>
            <Slider items={series} itemsPerPage={4} render={renderTrendingSerieCard} />
        </div>
    );

}

export default TrendingSeries