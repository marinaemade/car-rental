import React from 'react';
import { Typography } from "@material-tailwind/react";
import { 
  MagnifyingGlassIcon, 
  CalendarDaysIcon, 
  CheckBadgeIcon, 
  HandThumbUpIcon 
} from "@heroicons/react/24/outline";

const STEPS = [
  {
    id: 1,
    title: "Browse & Filter",
    desc: "Explore our premium fleet. Filter by type, budget, or fuel to find your ideal car.",
    icon: MagnifyingGlassIcon
  },
  {
    id: 2,
    title: "Choose Your Dates",
    desc: "Select your pickup and return dates. Flexible scheduling with free cancellation.",
    icon: CalendarDaysIcon
  },
  {
    id: 3,
    title: "Instant Confirmation",
    desc: "Complete your booking in minutes and receive instant confirmation with details.",
    icon: CheckBadgeIcon
  },
  {
    id: 4,
    title: "Drive & Enjoy",
    desc: "Pick up your vehicle at any location. 24/7 roadside assistance included.",
    icon: HandThumbUpIcon
  }
];

const HowItWorks = () => {
  return (
    <section className=" py-24 px-8 border-t border-lightDark bg-dark">
      <div className="mx-auto max-w-7xl text-center">
        <Typography variant="small" className="text-green font-bold uppercase tracking-widest mb-4">
          Simple Process
        </Typography>
        <Typography variant="h2" className="text-white text-4xl font-bold mb-6">
          Rent in 4 Easy Steps
        </Typography>
        <Typography className="text-gray max-w-2xl mx-auto mb-20">
          From browsing to driving — the entire process takes just a few minutes.
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="relative flex flex-col items-center group">
              {/* Connector Line (Hidden on mobile) */}
              {idx !== STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-[1px] bg-lightDark z-0" />
              )}
              
              {/* Icon Circle */}
              <div className="relative z-10 mb-8 h-24 w-24 rounded-2xl bg-green flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-transform group-hover:scale-110">
                <step.icon className="h-10 w-10 text-black" />
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-black border-2 border-green rounded-full flex items-center justify-center">
                  <Typography className="text-green text-xs font-bold">{step.id}</Typography>
                </div>
              </div>

              <Typography variant="h5" className="text-white font-bold mb-3">
                {step.title}
              </Typography>
              <Typography className="text-gray text-sm leading-relaxed">
                {step.desc}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;