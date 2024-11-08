import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const Slider = ({ items, itemsPerPage, render }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < items.length - itemsPerPage) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {/* <div className="flex overflow-x-auto space-x-4 overflow-x-hidden"> */}
            {items.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                    <div key={index}>
                        {render(item)}
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 flex justify-between mt-6 items-center pointer-events-none z-10">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="relative group bg-gray-900/50 text-white h-full px-4 py-2 m-[-25px]  rounded pointer-events-auto"
                >
                    < ChevronLeftIcon className="h-5 w-5 transition-transform duration-300 ease-in-out transform scale-100 group-hover:scale-150" />
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex >= items.length - itemsPerPage}
                    className="relative group bg-gray-900/50 text-white h-full px-4 py-2 m-[-25px] rounded pointer-events-auto"
                >
                    < ChevronRightIcon className="h-5 w-5 transition-transform duration-300 ease-in-out transform scale-100 group-hover:scale-150" />
                </button>
            </div>
        </div>
    );
}

export default Slider;