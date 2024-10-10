import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);

  const fetchSearch = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${searchText}&include_adult=false`
    );
    const { results } = await data.json();
    setContent(results);
  };
  useEffect(() => {
    fetchSearch();
  }, []);

  const Trigger = (e) => {
    setSearchText(e.target.value);
  };

  const Search = () => {
    fetchSearch();
  };

  {
    content &&
      content.map((Val) => {
        const {
          name,
          title,
          poster_path,
          first_air_date,
          release_date,
          media_type,
          id,
        } = Val;
        return (
          <>
            <div className="col-md-3 col-sm-4 py-3" id="card" key={id}>
              <div className="card bg-dark" key={id}>
                <img
                  src={poster_path ? `${img_300}/${poster_path}` : unavailable}
                  className="card-img-top pt-3 pb-0 px-3"
                />
                <div className="card-body">
                  <h5 className="card-title text-center fs-5">
                    {title || name}
                  </h5>
                  <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                    <div>{media_type === "tv" ? "TV" : "Movie"}</div>
                    <div>{first_air_date || release_date}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      });
  }
  // function search(formData) {
  //     const query = formData.get("query");
  //     alert(`You searched for '${query}'`);
  //   }
  //   return (
  //     <form id="search-form" role="search" action={search}>
  //       <input
  //       id='query'
  //       name="query"
  //       type="search"
  //       />
  //       <button type="submit">Search</button>
  //     </form>
  //   );
};

export default SearchBar;
