import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';

const category = [
    "Web development",
    "Application development",
    "Desktop application",
    "Standalone applications"
]

const PCards = () => {
    return (
        <>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((category, index) => (
                            <CarouselItem className="basis-1/2">
                                <Button variant="outline" className="rounded-full">{category}</Button>
                            </CarouselItem>
                        ))
                    }

                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </>
    )
}

export default PCards;