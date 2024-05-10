const useGenre = (value) => {
    if (value.length < 1) return "";
   
    const GenreIds = value.map((genre) => genre.id);
    return GenreIds.reduce((acc, curr) => acc + "," + curr);
  };
   
  export default useGenre;