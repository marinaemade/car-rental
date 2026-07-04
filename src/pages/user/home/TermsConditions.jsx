import React from 'react';
import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { ShieldCheckIcon, DocumentTextIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const TermsConditions = () => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="bg-black py-24 px-8 border-t border-lightDark">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <Typography variant="h2" className="text-white text-4xl font-bold mb-4">
            Rental <span className="text-green">Policy</span>
          </Typography>
          <Typography className="text-gray">
            Please review our terms to ensure a smooth and safe rental experience.
          </Typography>
        </div>

        <div className="space-y-4">
          {/* Main Contract Policy */}
          <div className="bg-dark border border-lightDark rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green/10 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-green" />
              </div>
              <Typography variant="h5" className="text-white font-bold">
                Mandatory Rental Contract
              </Typography>
            </div>
            <Typography className="text-gray text-sm leading-relaxed">
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
              className={`border border-lightDark rounded-xl px-6 transition-colors ${open === policy.id ? 'bg-dark/50' : 'bg-transparent'}`}
            >
              <AccordionHeader 
                onClick={() => handleOpen(policy.id)}
                className="border-b-0 text-white hover:text-green py-5"
              >
                <div className="flex items-center gap-3">
                  {policy.icon}
                  <span className="text-base font-bold">{policy.title}</span>
                </div>
              </AccordionHeader>
              <AccordionBody className="text-gray text-sm pt-0 pb-6">
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