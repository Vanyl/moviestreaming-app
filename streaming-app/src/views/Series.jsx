import React, { useState, useEffect } from "react";
import Genres from "../components/Genres";
import useGenre from "../hooks/useGenre";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const Series = () => {
  const apiKey = 'fe367ab8576243891c127d4f54eb4982';
  const [state, setState] = useState([]);
  const [genre, setGenre] = useState([]);
  const [value, setValue] = useState([]);
  const genreURL = useGenre(value);
  const img_tmdb = 'https://image.tmdb.org/t/p/w780' 
  const unavailable = 'https://www.movienewz.com/img/tvs/poster-holder.jpg'
 
 
  const fetchTrending = async () => {
    const data = await fetch(`
    https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genreURL}`);
    const dataJ = await data.json();
    setState(dataJ.results);
  };
  useEffect(() => {
    fetchTrending();
  }, [genreURL]);
 
 

  return (
    <div className="flex"> 
      <div className="w-1/4 p-4"> 
        <Genres
          genre={genre}
          setGenre={setGenre}
          type="tv"
          value={value}
          setValue={setValue}
        />
      </div>
      <div className="w-3/4 flex flex-wrap p-4"> 
        {state.map((Val) => {
          const {
            name,
            title,
            backdrop_path,
            first_air_date,
            release_date,
            media_type,
            id,
          } = Val;
          return (
            <div key={id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
              <div className="py-3 gap-2 rounded-t-lg " id="card">
                <Card className="card mt-3 bg-gray-900">
                  <CardHeader color="blue-gray" className="card-header relative h-32">
                    <img
                      src={backdrop_path ? `${img_tmdb}/${backdrop_path}` : unavailable}
                      className= "h-full w-full object-cover object-contain"
                      alt={title || name}
                    />
                  </CardHeader>
                  <CardBody className="card-body">
                    <Typography variant="h5" color="blue-gray" className="mb-2 text-white text-center text-s ">
                      {title || name}
                    </Typography>
                    <Typography className="flex text-xs items-center justify-evenly serie text-gray-500">
                      {/* <div>{media_type === "TV" ? "TV" : "Movie"}</div> */}
                      <div>{first_air_date || release_date}</div>
                    </Typography>
                  </CardBody>
                  <CardFooter className="card-footer pt-0 pb-0">
                    {/* <Link to={`/serie/${id}`}> */}
                    <Button className="card-btn mt-10 text-white bg-gray-600">Read More</Button>
                    {/* </Link> */}
                  </CardFooter>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Series;