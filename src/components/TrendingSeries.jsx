import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Card from "./Card.jsx";

import Slider from './Slider.jsx'

const TrendingSeries = () => {
    const img_780 = 'https://image.tmdb.org/t/p/w780'
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

    return (
        <div>
            <Typography className="text-lg text-white font-bold">Trending Tv Shows</Typography>
            <Slider items={series} itemsPerPage={4} render={(tv) => (
                <Card item={tv} img_780={img_780} unavailable={unavailable} />
            )} />
        </div>
    )


}

export default TrendingSeries