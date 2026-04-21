import React from 'react';
import { Typography, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { HomeIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const NotFound = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-green/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center z-10 mt-20">
        {/* Big Gradient 404 */}
        <Typography 
          className="font-black text-[150px] md:text-[220px] leading-none tracking-tighter bg-gradient-to-b from-green via-green/80 to-transparent bg-clip-text text-transparent select-none animate-pulse"
        >
          404
        </Typography>

        <div className="-mt-4 md:-mt-8">
          <Typography variant="h2" className="text-white text-3xl md:text-5xl font-bold mb-4">
            Page Not Found
          </Typography>
          <Typography className="text-gray max-w-md mx-auto mb-10 text-lg">
            It looks like you've taken a wrong turn. The page you are looking for doesn't exist or has been moved.
          </Typography>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Typography as={Link} to="/"
              className="flex items-center gap-2 bg-green text-black font-bold px-8 py-3"
            >
              <HomeIcon className="h-5 w-5" />
              Back to Home
            </Typography>
            
            <Button
              variant="outlined"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 border-green text-green hover:bg-green/10 px-8 py-3"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Branding Subtext */}
        <Typography className="text-gray/30 my-10 uppercase tracking-[0.5em] text-xs font-bold">
          RahalCar New York
        </Typography>
      </div>
    </div>
  );
};

export default NotFound;