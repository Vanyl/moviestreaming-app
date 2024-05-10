// * Header with logo and navigation links, search bar, user profile.
// * Movie details (title, description, rating, etc.)
// * List of similar movies
import { Outlet, Link } from "react-router-dom";
import './Movie.css'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { useState, useEffect } from "react";

const Movie = () => {
    const apiKey = 'fe367ab8576243891c127d4f54eb4982';
    const img_300 = 'https://image.tmdb.org/t/p/w780'
    const unavailable = 'https://www.movienewz.com/img/films/poster-holder.jpg'
    const [state, setState] = useState([]); //initializing the state variable as an empty array
    
    const fetchTrending = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);
          if (!response.ok) {
            throw new Error('Failed to fetch trending data');
          }
          const dataJson = await response.json();  // fetching data from API in JSON Format
          setState(dataJson.results); //storing that data in the state
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
    fetchTrending(); //calling the fetchTrending function only during the initial rendering of the app.
    }, []);

    return (
        <div className="">
            <div className="movie-container grid grid-cols-4 gap-4">
                {state.map((element) => {
                    const {
                        name,
                        title,
                        backdrop_path,
                        id,
                    } = element;
                    return (
                        <div>
                        <Card key={id} className="card mt-6 w-96 bg-black">
                            <CardHeader color="blue-gray" className="card-header relative h-32">
                                <img
                                    src={backdrop_path ? `${img_300}/${backdrop_path}` : unavailable}
                                    alt= {title}
                                    className= "h-full w-full object-cover object-contain"
                                />
                            </CardHeader>
                            <CardBody className="card-body">
                                <Typography variant="h5" color="blue-gray" className="mb-2 text-white text-center text-s ">
                                {title}
                                </Typography>
                                <Typography className="flex text-xs items-center justify-evenly serie text-gray-500">
                                    description
                                </Typography>
                            </CardBody>
                            <CardFooter className="card-footer pt-0 pb-0">
                                <Link to={`/movie/${id}`}>
                                    <Button className="card-btn mt-10 text-white bg-gray-600">Read More</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                        </div>
                    );
                })}
            </div>

            {/* List of similar movies */}
            <section className="similar-movies">
                {/* Add your similar movies list here */}
            </section>
        </div>
    )
}

export default Movie
 