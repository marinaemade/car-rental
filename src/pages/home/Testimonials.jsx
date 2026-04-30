import React from 'react';
import { Typography, Card, CardBody, Avatar, Carousel, IconButton } from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const REVIEWS = [
  {
    id: 1,
    name: "James Morrison",
    role: "Business Executive",
    content: "The BMW M4 I rented from RahalCar was absolutely phenomenal. The booking process was seamless and the car was immaculate.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Travel Blogger",
    content: "Rented the Range Rover for a road trip. Exceptional comfort and the RahalCar team was incredibly helpful. Will definitely be back!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Torres",
    role: "Car Enthusiast",
    content: "Drove the Porsche 911 GT3 and it was a life-changing experience. RahalCar offers the best service I've ever used by a mile.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className=" py-24 px-4 md:px-8 border-t border-lightDark bg-dark">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <Typography variant="small" className="text-green font-bold uppercase tracking-widest mb-4">
            Testimonials
          </Typography>
          <Typography variant="h2" className="text-white text-3xl md:text-4xl font-bold mb-4">
            What <span className="text-green">RahalCar</span> Customers Say
          </Typography>
          <div className="h-1 w-20 bg-green rounded-full"></div>
        </div>

        <Carousel
          className="rounded-xl pb-12"
          loop={true}
          autoplay={true}
          autoplayDelay={5000}
          // HIDE ARROWS ON MOBILE: 
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4 bg-dark/50 hover:bg-green/20 rounded-full hidden md:flex"
            >
              <ArrowLeftIcon strokeWidth={2} className="h-6 w-6" />
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-dark/50 hover:bg-green/20 rounded-full hidden md:flex"
            >
              <ArrowRightIcon strokeWidth={2} className="h-6 w-6" />
            </IconButton>
          )}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-green" : "w-4 bg-gray/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {REVIEWS.map((review) => (
            // REDUCED MOBILE PADDING
            <div key={review.id} className="px-2 md:px-24">
              <Card className="bg-dark border border-lightDark shadow-none">
                <CardBody className="p-6 md:p-12 text-center flex flex-col items-center">
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                    ))}
                  </div>

                  <Typography className="text-gray text-base md:text-lg italic mb-8 leading-relaxed font-normal max-w-2xl">
                    "{review.content}"
                  </Typography>

                  <div className="flex flex-col items-center gap-3">
                    <Avatar
                      src={review.image}
                      alt={review.name}
                      variant="circular"
                      size="lg"
                      className="border-2 border-green/30"
                    />
                    <div>
                      <Typography className="text-white font-bold text-base">
                        {review.name}
                      </Typography>
                      <Typography className="text-green text-xs font-medium uppercase tracking-wider">
                        {review.role}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;