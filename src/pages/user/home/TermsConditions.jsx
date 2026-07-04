import React, { useContext } from 'react';
import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { ShieldCheckIcon, DocumentTextIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from './../../../context/ThemeContext';

const TermsConditions = () => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  // Dynamic Theme Styling Classes based on your palette
  const bgClass = isDarkMode ? "bg-black" : "bg-white";
  const mainCardBg = isDarkMode ? "bg-dark" : "bg-grayLight bg-opacity-20";
  const borderClass = isDarkMode ? "border-lightDark" : "border-grayLight";
  const textTitleClass = isDarkMode ? "text-white" : "text-black";
  const textMutedClass = isDarkMode ? "text-gray" : "text-lightDark";
  
  // Custom dynamic class for active vs inactive accordion containers
  const getAccordionBg = (id) => {
    if (open === id) {
      return isDarkMode ? "bg-dark/50" : "bg-grayLight/40";
    }
    return "bg-transparent";
  };

  return (
    <section className={`${bgClass} py-24 px-8 border-t ${borderClass} transition-colors duration-300`}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <Typography variant="h2" className={`${textTitleClass} text-4xl font-bold mb-4`}>
            Rental <span className="text-green">Policy</span>
          </Typography>
          <Typography className={textMutedClass}>
            Please review our terms to ensure a smooth and safe rental experience.
          </Typography>
        </div>

        <div className="space-y-4">
          {/* Main Contract Policy */}
          <div className={`${mainCardBg} border ${borderClass} rounded-xl p-6 mb-8`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green/10 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-green" />
              </div>
              <Typography variant="h5" className={`${textTitleClass} font-bold`}>
                Mandatory Rental Contract
              </Typography>
            </div>
            <Typography className={`${textMutedClass} text-sm leading-relaxed`}>
              Upon vehicle selection, all renters are required to sign a formal legal contract. 
              This agreement illustrates that the vehicle must be returned in the **exact condition** it was received. Any mechanical or aesthetic damages found upon return will be 
              subject to inspection and repair fees.
            </Typography>
          </div>

          {/* Detailed Policy Accordions */}
          {[
            {
              id: 1,
              title: "Vehicle Condition & Maintenance",
              icon: <ShieldCheckIcon className="h-5 w-5 text-green" />,
              content: "The renter is responsible for maintaining the car's condition. This includes returning the car without any new scratches, dents, or internal damage. Standard wear and tear are expected, but structural or functional damage will trigger penalty clauses defined in your signed contract."
            },
            {
              id: 2,
              title: "Fuel & Cleaning Policy",
              icon: <ExclamationTriangleIcon className="h-5 w-5 text-green" />,
              content: "Vehicles must be returned with the same fuel level as at pickup. A professional cleaning fee may apply if the vehicle interior is returned with excessive dirt, stains, or smoke odors."
            },
            {
              id: 3,
              title: "Insurance & Liability",
              icon: <DocumentTextIcon className="h-5 w-5 text-green" />,
              content: "Our basic insurance covers standard accidents, but the renter remains liable for the deductible amount. Personal negligence or driving under influence voids all insurance coverage immediately."
            }
          ].map((policy) => (
            <Accordion 
              key={policy.id} 
              open={open === policy.id} 
              className={`border ${borderClass} rounded-xl px-6 transition-colors ${getAccordionBg(policy.id)}`}
            >
              <AccordionHeader 
                onClick={() => handleOpen(policy.id)}
                className={`border-b-0 ${textTitleClass} hover:text-green py-5`}
              >
                <div className="flex items-center gap-3">
                  {policy.icon}
                  <span className="text-base font-bold">{policy.title}</span>
                </div>
              </AccordionHeader>
              <AccordionBody className={`${textMutedClass} text-sm pt-0 pb-6`}>
                {policy.content}
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;