import { useState, useEffect } from "react";
import Card from "./Card";
import Slider from "./Slider";

const Genres = ({ media }) => {
  const [genres, setGenres] = useState([]);
  const [genreItems, setGenreItems] = useState({});
  const img_780 = 'https://image.tmdb.org/t/p/w780'

  const fetchMediaGenre = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/${media}/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
      const { genres } = await response.json();
      setGenres(genres);

      // fetch movies for each genre after getting the list
      genres.forEach(async (genre) => {
        const genreResponse = await fetch(`https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genre.id}`);
        const genreData = await genreResponse.json();
        setGenreItems((prevItems) => ({
          ...prevItems,
          [genre.id]: genreData.results,
        }));
      });
    } catch (error) {
      console.error(`Error fetching ${media} genres or items:`, error);
    }
  };


  useEffect(() => {
    fetchMediaGenre()
  }, [media]);

  return (
    <>
      <div className="genre-sections">
        {genres.map((genre) => (
          <div key={genre.id} className="genre-section mb-10">
            <h2 className="text-lg text-white font-bold">{genre.name} - {media === "movie" ? "Movies" : "TV Shows"}</h2>
            <Slider
            items={genreItems[genre.id] || []}
            itemsPerPage={4}
            render={(item) => (
              <Card key={item.id} item={item} img_780={img_780} media={media}/>
            )}
          />
          </div>
        ))}
      </div>
    </>
  )
}


export default Genres