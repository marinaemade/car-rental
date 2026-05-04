import { useNavigate } from "react-router-dom";

import React from "react";
import {
  Typography,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import {
  StarIcon,
  MapPinIcon,
  UsersIcon,
  Cog8ToothIcon,
  BeakerIcon,
} from "@heroicons/react/24/solid";

export default function CarCard({ car }) {
  
  const navigate = useNavigate();

  const isAvailable = car.available !== false;

  return (
    <Card className="
      bg-white border-gray
      dark:bg-softBlack dark:border-softBlack
      overflow-hidden group h-full flex flex-col
      transition-colors duration-300
    ">

      {/* Image */}
      <CardHeader className="relative m-0 rounded-none h-48">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Price */}
        <div className="absolute  bottom-3 right-3 bg-darkGreen  backdrop-blur-md px-3 py-1 rounded-lg border border-green">
          <Typography className=" font-bold text-sm">
            ${car.price}
            <span className="text-gray-500  dark:text-dark text-xs font-normal">/day</span>
          </Typography>
        </div>

        {/* Category */}
        <div className="absolute top-3 left-3 bg-darkGreen backdrop-blur-sm px-2 py-0.5 rounded border border-green">
          <Typography className="text-green-700  dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">
            {car.category}
          </Typography>
        </div>

        {/* Availability Badge */}
        {!isAvailable && (
          <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm px-2 py-0.5 rounded border border-red-400">
            <Typography className="text-white text-[10px] font-bold uppercase tracking-wider">
              Not Available
            </Typography>
          </div>
        )}
      </CardHeader>

      {/* Body */}
      <CardBody className="p-5 flex-1">

        {/* Title + Rating */}
        <div className="flex justify-between  items-start mb-2">
          <div>
            <Typography className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-tighter">
              {car.brand}
            </Typography>
            <Typography className="text-gray-900 dark:text-white font-bold text-lg leading-tight">
              {car.model}
            </Typography>
          </div>

          <div className="flex items-center gap-1  ">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            <Typography className="text-gray-900 dark:text-white text-xs font-bold">
              {car.rating}
            </Typography>
            <Typography className="text-gray-500 dark:text-gray-400 text-[10px]">
              ({car.reviews})
            </Typography>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-4">
          <MapPinIcon className="h-3 w-3" />
          <Typography className="text-[11px]">
            {car.location} • {car.year}
          </Typography>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 ">
          <div className="bg-gray-100 dark:bg-softBlack p-2 rounded-md flex flex-col items-center border border-gray-200 dark:border-white/10">
            <BeakerIcon className="h-3 w-3 text-gray-400 mb-1" />
            <Typography className="text-[9px] text-gray-500 dark:text-gray-400 uppercase">
              {car.fuelType}
            </Typography>
          </div>

          <div className="bg-gray-100 dark:bg-softBlack p-2 rounded-md flex flex-col items-center border border-gray-200 dark:border-white/10">
            <Cog8ToothIcon className="h-3 w-3 text-gray-400 mb-1" />
            <Typography className="text-[9px] text-gray-500 dark:text-gray-400 uppercase">
              {car.transmission}
            </Typography>
          </div>

          <div className="bg-gray-100 dark:bg-softBlack p-2 rounded-md flex flex-col items-center border border-gray-200 dark:border-white/10">
            <UsersIcon className="h-3 w-3 text-gray-400 mb-1" />
            <Typography className="text-[9px] text-gray-500 dark:text-gray-400 uppercase">
              {car.seats} Seats
            </Typography>
          </div>
        </div>
      </CardBody>

      {/* Footer */}
      <CardFooter className="p-5 pt-0 mt-auto">
        <Button
          fullWidth
          onClick={() => navigate(`/cars/${car.id}`)}
          disabled={!isAvailable}
          className={`font-bold py-3 shadow-none transition-all duration-300 ${
            isAvailable
              ? "bg-green text-black hover:bg-green hover:scale-[1.02] cursor-pointer"
              : "bg-gray-100 dark:bg-white text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-300 dark:border-white/20"
          }`}
        >
          {isAvailable ? "View Details & Book" : "Not Available"}
        </Button>
      </CardFooter>
    </Card>
  );
}
