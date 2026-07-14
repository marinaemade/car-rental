import React, { useContext } from 'react';
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  SparklesIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { ThemeContext } from './../../../context/ThemeContext';

const About = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  // Dynamic Theme Styling Classes based on my palette
  const bgClass = isDarkMode ? "bg-black" : "bg-white";
  const sectionBgClass = isDarkMode ? "bg-black/50" : "bg-grayLight/20";
  const cardBgClass = isDarkMode ? "bg-dark" : "bg-grayLight bg-opacity-30";
  const borderClass = isDarkMode ? "border-lightDark" : "border-grayLight";
  const textTitleClass = isDarkMode ? "text-white" : "text-black";
  const textMutedClass = isDarkMode ? "text-gray" : "text-lightDark";
  const gradientHeading = isDarkMode 
    ? "from-green via-green/80 to-transparent" 
    : "from-darkGreen via-green to-green/30";

  const trustData = [
    {
      icon: ShieldCheckIcon,
      title: "Clear Contracts",
      description: "Every rental includes a detailed contract. This agreement ensures the vehicle is returned in its original condition, keeping our fleet pristine for the next user."
    },
    {
      icon: SparklesIcon,
      title: "Special Offers",
      description: "From weekend getaway deals to long-term corporate discounts, we provide unbeatable value across our entire range of premium vehicles."
    },
    {
      icon: GlobeAltIcon,
      title: "Cairo  Based",
      description: "Deeply rooted in our local community while serving international clients with world-class standards and local expertise."
    }
  ];

  return (
    <div className={`${bgClass} min-h-screen pt-24 relative overflow-hidden transition-colors duration-300`}>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-green/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 1. Hero Section */}
      <section className="relative px-8 mb-24 text-center flex flex-col items-center py-20">
        <Typography variant="small" className="text-green font-bold uppercase tracking-[0.2em] mb-4">
          The RahalCar Story
        </Typography>

        <Typography variant="h1" className={`${textTitleClass} text-5xl md:text-8xl font-black mb-6 leading-none tracking-tighter`}>
          Redefining Your <br />
          <span className={`bg-gradient-to-b ${gradientHeading} bg-clip-text text-transparent`}>
            Journey
          </span>
        </Typography>

        <Typography className={`${textMutedClass} max-w-3xl text-lg leading-relaxed`}>
          At RahalCar, we don't just rent vehicles; we provide the freedom to explore. 
          Based in Cairo, we've built a fleet that combines luxury with reliability, 
          ensuring every mile you drive is a memory made.
        </Typography>
      </section>

      {/* 2. Driver Flexibility Section */}
      <section className={`py-20 px-8 border-y ${borderClass} ${sectionBgClass} backdrop-blur-sm relative z-10 transition-colors duration-300`}>
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Typography variant="h3" className={`${textTitleClass} text-3xl font-bold mb-6`}>
              Your Drive, <span className="text-green">Your Choice</span>
            </Typography>
            <Typography className={`${textMutedClass} mb-8 leading-relaxed`}>
              Whether you want the thrill of being behind the wheel or the luxury of being 
              driven, RahalCar caters to your specific needs.
            </Typography>
            <ul className="space-y-4">
              {[
                "Self-Drive: Total freedom with our high-performance fleet.",
                "Chauffeur Service: Professional, multilingual drivers for a stress-free experience.",
                "24/7 Concierge: Support for both driver and vehicle throughout your rental."
              ].map((item, i) => (
                <li key={i} className={`flex items-center gap-3 ${textTitleClass}`}>
                  <CheckCircleIcon className="h-5 w-5 text-green" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`${cardBgClass} border ${borderClass} rounded-2xl overflow-hidden shadow-2xl`}>
                <img 
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800" 
                  alt="Driving" 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" 
                />
            </div>
            <div className={`${cardBgClass} border ${borderClass} rounded-2xl overflow-hidden mt-8 shadow-2xl`}>
                <img 
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" 
                  alt="Luxury Driver" 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" 
                />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contracts & Trust Section */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Typography variant="h2" className={`${textTitleClass} text-4xl md:text-6xl font-black mb-4 tracking-tighter`}>
              Commitment to <br />
              <span className={`bg-gradient-to-b ${gradientHeading} bg-clip-text text-transparent`}>
                Quality
              </span>
            </Typography>
            <Typography className={`${textMutedClass} max-w-xl mx-auto`}>
              Our transparent contract system ensures both the car and your peace of mind are protected.
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustData.map((item, index) => (
              <Card key={index} className={`${cardBgClass} border ${borderClass} p-4 hover:border-green/30 transition-all duration-300 group`}>
                <CardBody className="flex flex-col items-center text-center">
                  <item.icon className="h-12 w-12 text-green mb-6 group-hover:scale-110 transition-transform" />
                  <Typography variant="h5" className={`${textTitleClass} mb-3`}>{item.title}</Typography>
                  <Typography className={`${textMutedClass} text-sm leading-relaxed`}>
                    {item.description}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;