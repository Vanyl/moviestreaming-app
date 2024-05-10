import { useState, useEffect } from "react";
const apiKey = 'fe367ab8576243891c127d4f54eb4982';
 
const Genres = ({ genre, setGenre, type, value, setValue }) => {
const fetchGenre = async () => {
const data = await fetch( `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US
`);
const { genres } = await data.json();
setGenre(genres);
};
 
useEffect(() => {
fetchGenre();
}, []);

//Adding a particular genre to the selected array
const CategoryAdd = (genres) => {
    //first - select everything that's inside of values using the spread operator
    //second - add those genres that are being sent from the non-selected arrays
    setValue([...value, genres]);
    //removing those genres from the non-selected array that have been added to the selected array.
    setGenre(genre.filter((g) => g.id !== genres.id));
};

//removing a particular genre from the selected array
const CategoryRemove = (genres) => {
    setValue(value.filter((g) => g.id !== genres.id));
    setGenre([...genre, genres]);
    };

    return(
    <>
      <div className="genre-container">
        <div className="row mb-3">
          <div className="col-12 d-flex flex-wrap">
            {value &&
              value.map((Val) => {
                const { id, name } = Val;
                return (
                  <>
                    <div className="m-2" key={id}>
                      <button
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:scale-125 focus:outline-none focus:bg-gray-700"
                        onClick={() => CategoryRemove(Val)}
                      >
                        {name}
                      </button>
                    </div>
                  </>
                );
              })}
            {genre && //if genre exist
              genre.map((Gen) => {
                const { id, name } = Gen;
                return (
                  <>
                    <div className="m-2" key={id}>
                      <button
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg  hover:scale-125 focus:outline-none focus:bg-gray-700"
                        onClick={() => CategoryAdd(Gen)}
                      >
                        {name}
                      </button>
                    </div>
                  </>
                );
              })}

          </div>
        </div>
      </div>
      </>
      )
}


export default Genres