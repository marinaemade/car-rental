import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import { 
  StarIcon, 
  MapPinIcon, 
  UsersIcon, 
  Cog8ToothIcon, 
  BeakerIcon 
} from "@heroicons/react/24/solid";

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the data.json file
    const fetchCars = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setCars(data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <section className="bg-black py-20 px-8 flex justify-center items-center">
        <Typography className="text-green text-xl font-bold animate-pulse">Loading Fleet...</Typography>
      </section>
    );
  }
  return (
    <section className="bg-black py-20 px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center text-center">
          <Typography variant="h2" className="text-white text-4xl font-bold mb-2">
            Featured <span className="text-green">Cars</span>
          </Typography>

          <Typography className="text-gray max-w-md font-normal">
            Explore our world-class collection of premium cars available for your next journey.
          </Typography>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(({image,price,category,rating,model,id,brand,reviews,transmission,location, year, fuelType, seats}) => (
            <Card key={id} className="bg-dark border border-lightDark overflow-hidden group">
              <CardHeader className="relative m-0 rounded-none h-48">
                <img src={image} alt={model} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                
                {/* Price Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-green/30">
                  <Typography className="text-green font-bold text-sm">
                    ${price}<span className="text-grayLight text-xs font-normal">/day</span>
                  </Typography>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-green/20 backdrop-blur-sm px-2 py-0.5 rounded border border-green/50">
                  <Typography className="text-green text-[10px] font-bold uppercase tracking-wider">
                    {category}
                  </Typography>
                </div>
              </CardHeader>

              <CardBody className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Typography className="text-gray text-[10px] font-bold uppercase tracking-tighter">
                      {brand}
                    </Typography>
                    <Typography className="text-white font-bold text-lg leading-tight">
                      {model}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-500" />
                    <Typography className="text-white text-xs font-bold">{rating}</Typography>
                    <Typography className="text-gray text-[10px]">({reviews})</Typography>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray mb-4">
                  <MapPinIcon className="h-3 w-3" />
                  <Typography className="text-[11px]">{location} • {year}</Typography>
                </div>

                {/* Tech Specs */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-softBlack p-2 rounded-md flex flex-col items-center justify-center border border-lightDark">
                    <BeakerIcon className="h-3 w-3 text-gray mb-1" />
                    <Typography className="text-[9px] text-grayLight uppercase">{fuelType}</Typography>
                  </div>
                  <div className="bg-softBlack p-2 rounded-md flex flex-col items-center justify-center border border-lightDark">
                    <Cog8ToothIcon className="h-3 w-3 text-gray mb-1" />
                    <Typography className="text-[9px] text-grayLight uppercase">{transmission}</Typography>
                  </div>
                  <div className="bg-softBlack p-2 rounded-md flex flex-col items-center justify-center border border-lightDark">
                    <UsersIcon className="h-3 w-3 text-gray mb-1" />
                    <Typography className="text-[9px] text-grayLight uppercase">{seats} Seats</Typography>
                  </div>
                </div>
              </CardBody>

              <CardFooter className="p-5 pt-0">
                <Link to={`/carDetails/${id}`}>
                  <Button
                    fullWidth
                    className="bg-green text-black font-bold py-3 hover:bg-softGreen shadow-none hover:shadow-green/20"
                  >
                    View Details & Book
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 flex justify-center">
          <Link to="/cars">
            <Button
              variant="outlined"
              className="flex items-center gap-2 border-green text-green hover:bg-green/10 capitalize text-sm focus:outline-none focus:ring-0"
            >
              View All Fleet <span>&rarr;</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;