import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from "@material-tailwind/react";
import { ArrowLongRightIcon, PlayIcon, StarIcon } from "@heroicons/react/24/outline";

const carBgImage = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"; 

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* Background Image with Deep Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${carBgImage})` }}
      >
        <div className="absolute inset-0 bg-dark/95 via-black/90 to-black/95 opacity-90"></div>
      </div>

      {/* Content Container  */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 pt-40 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Text and CTA Content */}
          <div className="md:col-span-12 lg:col-span-8">
            {/* Main Headline */}
            <Typography variant="h1" className="mb-6 max-w-3xl text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Drive Your <span className="text-green">Dream Car</span> Today
            </Typography>
            <Typography variant="lead" className="mb-10 max-w-xl text-lg font-normal text-gray leading-relaxed">
              From luxury sedans to high-performance supercars. Premium vehicles at unbeatable prices, available nationwide.
            </Typography>
            
            {/* CTA Buttons  */}
            <div className="mb-16 flex flex-wrap gap-4">
              <Link to="/cars">
                <Button size="lg" className="flex items-center gap-3 bg-green font-bold text-black group hover:bg-softGreen transition-all shadow-green/20 hover:shadow-green/30">
                  Browse Fleet
                  <ArrowLongRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="text"
                  className="flex items-center gap-3 text-white border border-lightDark hover:bg-lightDark/50 group"
                >
                  <div className="p-1 rounded-full bg-lightDark group-hover:bg-softBlack">
                    <PlayIcon className="h-5 w-5 text-green" />
                  </div>
                  About Us
                </Button>
              </Link>
            </div>

            {/* Stats Section with Divider */}
            <div className="border-t border-lightDark pt-10">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
                {[
                  { value: "500+", label: "Premium Cars" },
                  { value: "20+", label: "Pickup Locations" },
                  { value: "$49", label: "Starting / Day", prefix: true },
                ].map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <Typography variant="h2" className="text-4xl font-extrabold text-white">
                      {stat.value}
                    </Typography>
                    <Typography className="text-sm font-normal text-gray uppercase tracking-wider">
                      {stat.label}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

          </div>

          

        </div>
      </div>
    </div>
  )
}

export default Hero