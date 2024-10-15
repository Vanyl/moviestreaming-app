import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PlayIcon } from "@heroicons/react/24/solid";

const CardComponent = ({ item, img_780, unavailable }) => {
    const { title, original_name, overview, poster_path, backdrop_path, id, release_date, first_air_date } = item;

    const truncate = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="relative">
            <Card className="group max-w-[24rem] overflow-hidden card mt-6 bg-black hover:z-10 hover:scale-105 hover:absolute hover:top-0 hover:left-0 transform transition duration-300 ease-in-out origin-center">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="blue-gray"
                    className="m-0 rounded-none card-header relative h-32"
                >
                    <img
                        src={backdrop_path ? `${img_780}/${backdrop_path}` : unavailable}
                        alt={title ? `${title}` : `${original_name}`}
                        className="h-full w-full object-cover object-contain"
                    />
                </CardHeader>
                <CardBody className="hidden group-hover:block">
                    <Typography className="mb-2 text-lg text-white font-bold">
                        {title ? `${title}` : `${original_name}`}
                    </Typography>
                    <Typography className="text-xs font-semibold">{release_date || first_air_date}</Typography>
                    <Typography variant="lead" className="flex text-xs items-center justify-evenly serie text-white mt-3 font-semibold">
                        {truncate(overview, 100)}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 pb-0 mb-5 flex justify-center items-center hidden group-hover:flex">
                    <Link to={`/${item}/${id}`}>
                        <Button className="text-white w-full bg-gray-800 flex justify-item items-center gap-1 hover:bg-white hover:text-black">
                            <PlayIcon className="h-5 w-5" /> Lecture
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CardComponent;
