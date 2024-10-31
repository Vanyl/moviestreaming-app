import CarouselDefault from "../components/Carousel";
import { useParams } from "react-router-dom";

const SeriePage = () => {
  const { id } = useParams();
  return (
    <>
      <CarouselDefault api={`https://api.themoviedb.org/3/tv/${id}`} />
      <div className="max-w-7xl mx-auto px-4 pb-4 space-y-10">
        <h1 className="text-white">Similar tv shows {id}</h1>
      </div>
    </>
  )
}

export default SeriePage;