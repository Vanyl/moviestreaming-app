import { Carousel, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import amazonPrimeLogoBlue from "../assets/amazonPrimeLogoBlue.webp"
import { PlayIcon, PlusIcon } from "@heroicons/react/24/solid"
import { InformationCircleIcon } from "@heroicons/react/24/outline"


const CarouselDefault = () => {
  const apiKey = 'fe367ab8576243891c127d4f54eb4982';
  const img_1280 = 'https://image.tmdb.org/t/p/w1280'
  const unavailable = 'https://www.movienewz.com/img/films/poster-holder.jpg'
  const [movies, setMovies] = useState([]); //initializing the state variable as an empty array

  const fetchCarousel = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch trending data');
      }
      const dataJson = await response.json();  // fetching data from API in JSON Format
      setMovies(dataJson.results); //storing that data in the state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };


  return (
    <Carousel
      transition={{ duration: 1, type: "tween" }}
      className="h-5/6 w-screen rounded-lg overflow-hidden mb-[48px]"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-3.5 bg-white" : "w-1.5 bg-white/50"
                }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {movies.slice(0, 5).map((movie) => {
        const { id, title, backdrop_path, overview } = movie;
        return (
          <div key={id} className="relative h-full w-full">
            <img
              src={backdrop_path ? `${img_1280}/${backdrop_path}` : unavailable}
              alt={title}
              className="object-cover h-auto w-full"
            />
            <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
              <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32 text-left">
                <img className="max-h-[25px] max-w-[120px] px-3 text-black mb-5 " src={amazonPrimeLogoBlue} alt="Prime Video" />
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  {title}
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-12 text-xs sm:text-sm md:text-base font-semibold"
                >
                  {truncate(overview, 80)}
                </Typography>
                <div className="flex gap-2">
                  <Button size="lg" className="text-white mr-5 w-80 bg-gray-800 flex justify-center items-center gap-2 hover:bg-white hover:text-black hidden md:inline-flex">
                    <PlayIcon className="h-5 w-5" />Watch Now
                  </Button>
                  <Button size="lg" color="white" className="text-white p-4 md:bg-transparent lg:bg-gray-800 hover:bg-white hover:text-black rounded-full hidden md:inline-flex">
                    <PlusIcon className="h-8 w-8" />
                  </Button>
                  <Button size="lg" color="white" className="text-white p-4 md:bg-transparent lg:bg-gray-800 hover:bg-white hover:text-black rounded-full hidden md:inline-flex">
                    <InformationCircleIcon className="h-8 w-8" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}

export default CarouselDefault;