import {useState} from "react";
import CarouselItem from "@/dashboard/carousel/item";

export default function Carousel() {

    const [items] = useState([
        {index: 1},
        {index: 2},

    ])

    return (
        <div className="carousel">
            <div className="list">
                {items.map(item => (
                    <CarouselItem
                        key={item.index}
                        index={item.index}
                    />
                ))}
            </div>
        </div>
    )
}