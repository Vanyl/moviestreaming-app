import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Genres from "../components/Genres";
import useGenre from "../hooks/useGenre";
import CarouselDefault from "../components/Carousel";


const Movies = () => {

    const apiKey = 'fe367ab8576243891c127d4f54eb4982';
    // fetch(urlTest)
    // .then(res => res.json())
    // .then(json => console.log(json))
    // .catch(err => console.error('error:' + err));
    const img_300 = 'https://image.tmdb.org/t/p/w300'
    const unavailable = 'https://www.movienewz.com/img/films/poster-holder.jpg'
    const [state, setState] = useState([]); //initializing the state variable as an empty array
    const [genre, setGenre] = useState([]);
    const [value, setValue] = useState([]);
    const genreURL = useGenre(value);

    const fetchTrending = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genreURL}`);
          if (!response.ok) {
            throw new Error('Failed to fetch trending data');
          }
          const dataJson = await response.json();  // fetching data from API in JSON Format
          console.log(dataJson.results);
          setState(dataJson.results); //storing that data in the state
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
    fetchTrending(); //calling the fetchTrending function only during the initial rendering of the app.
    }, [genreURL]);

    return (
      <>
      <CarouselDefault api={'https://api.themoviedb.org/3/movie/now_playing'} />
        <div className="grid grid-cols-4 py-3 gap-2">
          <Genres
            genre={genre}
            setGenre={setGenre}
            type="tv"
            value={value}
            setValue={setValue}
          />
            {
                state.map((element) => {
                    const {
                        name,
                        title,
                        poster_path,
                        first_air_date,
                        release_date,
                        media_type,
                        id,
                    } = element;
            
                return (
                          <div
                            key={id}
                            id="card"
                            className="py-3 gap-2 rounded-t-lg"
                          >
                            <div className="card bg-grey" key={id}>
                              <img
                                src={poster_path ? `${img_300}/${poster_path}` : unavailable}
                                className="card-img-top rounded-t-lg pt-3 pb-0 px-3 overflow:hidden"
                              />
                              <div className="card-body">
                                <h5 className="card-title text-center text-s">{title || name}</h5>
                                <div className="flex text-xs items-center justify-evenly movie">
                                  <div>{media_type === "tv" ? "TV" : "Movie"}</div>
                                  <div>{first_air_date || release_date}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                      );
            })}
        </div>
      </>
    )
      }

export default Movies;