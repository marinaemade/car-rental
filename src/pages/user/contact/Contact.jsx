import React, { useState, useContext } from "react";
import {
  Typography,
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { ThemeContext } from './../../../context/ThemeContext';

const Contact = () => {
  const [showMap, setShowMap] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  // Dynamic Theme Styling Classes based on color palette
  const bgClass = isDarkMode ? "bg-black" : "bg-white";
  const cardBgClass = isDarkMode ? "bg-dark" : "bg-grayLight bg-opacity-30";
  const borderClass = isDarkMode ? "border-lightDark" : "border-grayLight";
  const textTitleClass = isDarkMode ? "text-white" : "text-black";
  const textMutedClass = isDarkMode ? "text-gray" : "text-lightDark";
  const mapOverlayBg = isDarkMode ? "bg-black/40 group-hover:bg-black/20" : "bg-white/40 group-hover:bg-white/20";
  const mapIframeFilter = isDarkMode ? "grayscale(1) invert(0.9) contrast(1.2)" : "grayscale(0.2)";

  // 1. Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // 2. Validation Errors State
  const [errors, setErrors] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear individual field error as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation and Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Name Validation (> 3 characters)
    if (formData.name.trim().length <= 2) {
      newErrors.name = "Name must be greater than 3 characters.";
    }

    // Email Validation (Must include @ and .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email containing '@' and ending with '.com'.";
    }

    // Subject Validation (Not empty)
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject cannot be empty.";
    }

    // Message Validation (Not empty)
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Programmatic Mail Delivery to destination address
    const emailDestination = "marmouraemade@gmail.com";
    const mailtoLink = `mailto:${emailDestination}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
  };
  
  return (
    <div className={`${bgClass} min-h-screen pt-24 pb-12 transition-colors duration-300`}>
      
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <Typography variant="small" className="text-green font-bold uppercase tracking-widest mb-4">
            Get In Touch
          </Typography>
          <Typography variant="h2" className={`${textTitleClass} text-3xl md:text-5xl font-bold mb-4`}>
            Contact <span className="text-green">RahalCar</span>
          </Typography>
          <div className="h-1 w-20 bg-green rounded-full mb-6"></div>
          <Typography className={`${textMutedClass} max-w-2xl px-4 md:px-0`}>
            Have questions about our fleet or special offers? Our team is here 24/7 to assist with your booking.
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* 1. Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 order-2 lg:order-1">
            <Card className={`${cardBgClass} border ${borderClass} shadow-none`}>
              <CardBody className="flex items-start gap-4 p-4 md:p-6">
                <div className="bg-green/10 p-3 rounded-lg shrink-0">
                  <MapPinIcon className="h-6 w-6 text-green" />
                </div>
                <div>
                  <Typography variant="h6" className={`${textTitleClass} font-bold`}>Our Location</Typography>
                  <Typography className={`${textMutedClass} text-sm`}>123 Luxury Drive, Manhattan<br />Cairo, NS 10001</Typography>
                </div>
              </CardBody>
            </Card>

            <Card className={`${cardBgClass} border ${borderClass} shadow-none`}>
              <CardBody className="flex items-start gap-4 p-4 md:p-6">
                <div className="bg-green/10 p-3 rounded-lg shrink-0">
                  <PhoneIcon className="h-6 w-6 text-green" />
                </div>
                <div>
                  <Typography variant="h6" className={`${textTitleClass} font-bold`}>Phone Number</Typography>
                  <Typography className={`${textMutedClass} text-sm`}>+1 (555) 000-RAHAL</Typography>
                </div>
              </CardBody>
            </Card>

            <Card className={`${cardBgClass} border ${borderClass} shadow-none`}>
              <CardBody className="flex items-start gap-4 p-4 md:p-6">
                <div className="bg-green/10 p-3 rounded-lg shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-green" />
                </div>
                <div>
                  <Typography variant="h6" className={`${textTitleClass} font-bold`}>Email Address</Typography>
                  <Typography className={`${textMutedClass} text-sm`}>support@rahalcar.com</Typography>
                </div>
              </CardBody>
            </Card>

            <Card className={`${cardBgClass} border ${borderClass} shadow-none`}>
              <CardBody className="flex items-start gap-4 p-4 md:p-6">
                <div className="bg-green/10 p-3 rounded-lg shrink-0">
                  <ClockIcon className="h-6 w-6 text-green" />
                </div>
                <div>
                  <Typography variant="h6" className={`${textTitleClass} font-bold`}>Working Hours</Typography>
                  <Typography className={`${textMutedClass} text-sm`}>24/7 Support for Rentals</Typography>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* 2. Contact Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className={`${cardBgClass} border ${borderClass} shadow-none h-full`}>
              <CardBody className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Name Input */}
                  <div className="col-span-1">
                    <Typography className={`${textTitleClass} mb-2 font-medium`}>Your Name</Typography>
                    <Input 
                      size="lg" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className={`bg-transparent ${textTitleClass} ${
                        errors.name 
                          ? "!border-red-500 focus:!border-red-500" 
                          : "!border-lightDark focus:!border-green"
                      }`} 
                      labelProps={{ className: "hidden" }}
                    />
                    {errors.name && (
                      <Typography variant="small" className="text-red-500 text-xs mt-1 font-medium">
                        {errors.name}
                      </Typography>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="col-span-1">
                    <Typography className={`${textTitleClass} mb-2 font-medium`}>Email Address</Typography>
                    <Input 
                      size="lg" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@mail.com" 
                      className={`bg-transparent ${textTitleClass} ${
                        errors.email 
                          ? "!border-red-500 focus:!border-red-500" 
                          : "!border-lightDark focus:!border-green"
                      }`} 
                      labelProps={{ className: "hidden" }}
                    />
                    {errors.email && (
                      <Typography variant="small" className="text-red-500 text-xs mt-1 font-medium">
                        {errors.email}
                      </Typography>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div className="col-span-1 md:col-span-2">
                    <Typography className={`${textTitleClass} mb-2 font-medium`}>Subject</Typography>
                    <Input 
                      size="lg" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Rental Inquiry" 
                      className={`bg-transparent ${textTitleClass} ${
                        errors.subject 
                          ? "!border-red-500 focus:!border-red-500" 
                          : "!border-lightDark focus:!border-green"
                      }`} 
                      labelProps={{ className: "hidden" }}
                    />
                    {errors.subject && (
                      <Typography variant="small" className="text-red-500 text-xs mt-1 font-medium">
                        {errors.subject}
                      </Typography>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="col-span-1 md:col-span-2">
                    <Typography className={`${textTitleClass} mb-2 font-medium`}>Message</Typography>
                    <Textarea 
                      rows={5} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your trip..." 
                      className={`bg-transparent ${textTitleClass} ${
                        errors.message 
                          ? "!border-red-500 focus:!border-red-500" 
                          : "!border-lightDark focus:!border-green"
                      }`} 
                      labelProps={{ className: "hidden" }}
                    />
                    {errors.message && (
                      <Typography variant="small" className="text-red-500 text-xs mt-1 font-medium">
                        {errors.message}
                      </Typography>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-1 md:col-span-2">
                    <Button 
                      type="submit"
                      fullWidth 
                      className="bg-green text-black font-bold text-base py-4 hover:shadow-green/20 transition-all active:scale-95"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* 3. Map Section */}
        <div 
          className={`mt-12 md:mt-16 rounded-2xl overflow-hidden border ${borderClass} h-[300px] md:h-[450px] ${cardBgClass} relative cursor-pointer group`}
          onClick={() => setShowMap(true)}
        >
          {!showMap ? (
            <>
              <div className={`absolute inset-0 flex items-center justify-center z-10 ${mapOverlayBg} transition-all`}>
                <div className="text-center px-4">
                  <div className="bg-green p-4 rounded-full inline-block mb-4 shadow-lg shadow-green/20 group-hover:scale-110 transition-transform">
                    <MapPinIcon className="h-8 w-8 text-black" />
                  </div>
                  <Typography variant="h5" className={`${textTitleClass} font-bold mb-2`}>View Interactive Map</Typography>
                  <Typography className={`${textMutedClass} text-sm md:text-base`}>Click to explore our Cairo location</Typography>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1600" 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                alt="Cairo Map View"
              />
            </>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1713200000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: mapIframeFilter }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RahalCar Location Map"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;