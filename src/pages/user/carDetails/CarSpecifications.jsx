import { Typography, Button, Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowUturnLeftIcon,
  MapPinIcon,
  BeakerIcon,
  Cog8ToothIcon,
  UsersIcon,
  StarIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/solid";

export default function CarSpecifications({ car, similarCars, navigate }) {
  
  if (!car) {
    return (
      <div className="lg:col-span-2 flex justify-center items-center h-64">
        <Typography className="text-gray-500 dark:text-gray-400">Loading vehicle details...</Typography>
      </div>
    );
  }


  return (
    <div className="lg:col-span-2 ">
      {/* Car Info Card */}
      <div className="bg-white dark:bg-softBlack border border-grayLight dark:border-dark rounded-2xl p-6 mb-12">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-green dark:bg-green text-black dark:text-black border border-green dark:border-green px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest">
            {car.category}
          </span>
          {car.available && (
            <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-500/20 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest">
              Available
            </span>
          )}
        </div>

        {/* Brand + Model + Rating + Price */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <Typography className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
              {car.brand}
            </Typography>
            <Typography
              variant="h2"
              className="text-gray-900 dark:text-white text-2xl font-bold"
            >
              {car.model}
            </Typography>
          </div>
          <div className="text-right">
            <Typography className="text-green dark:text-green text-2xl font-bold">
              ${car.price}
              <span className="text-black dark:text-grayLight text-sm font-normal">
                /day
              </span>
            </Typography>
            <div className="flex items-center gap-1 justify-end mt-1">
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <Typography className="text-gray-900 dark:text-white text-sm font-bold">
                {car.rating}
              </Typography>
              <Typography className="text-gray-500 dark:text-gray-400 text-xs">
                ({car.reviews} reviews)
              </Typography>
            </div>
          </div>
        </div>

        {/* Year + Location */}
        <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 text-sm mb-4">
          <span className="flex items-center gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              📅
            </span>{" "}
            {car.year}
          </span>
          <span className="flex items-center gap-1">
            <MapPinIcon className="h-4 w-4 text-green dark:text-green" />{" "}
            {car.location}
          </span>
        </div>

        {/* Description */}
        {car.description && (
          <Typography className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            {car.description}
          </Typography>
        )}
      </div>

      {/* Vehicle Specifications */}
      <Card className="mb-8 bg-white  border border-grayLight dark:border-dark shadow-sm rounded-2xl overflow-hidden">
        <CardBody className="p-8 dark:bg-softBlack  dark:text-gray border-white  ">
          <Typography className="text-dark dark:text-gray font-bold text-lg mb-6">
            Vehicle Specifications
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8   dark:bg-softBlack">
            {[
              { icon: BeakerIcon, label: "Fuel Type", value: car.fuelType },
              { icon: Cog8ToothIcon, label: "Transmission", value: car.transmission },
              { icon: UsersIcon, label: "Seating", value: `${car.seats} Seats` },
              { icon: CalendarDaysIcon, label: "Year", value: car.year },
            ].map((spec, i) => (
              <div key={i} className="bg-gray-50 dark:bg-softBlack p-4 rounded-xl text-center border border-gray dark:border-gray  ">
                <spec.icon className="h-6 w-6 text-green mx-auto mb-2" />
                <p className="text-[10px] text-gray-400 uppercase font-bold">{spec.label}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-gray">{spec.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray dark:border-white">
             <div><p className="text-xs text-gray-400">Engine</p><p className="font-bold text-sm text-gray-800 dark:text-gray-200">{car.engine || "3.0L Turbo"}</p></div>
             <div><p className="text-xs text-gray-400">Horsepower</p><p className="font-bold text-sm text-gray-800 dark:text-gray-200">{car.horsepower || "503"} hp</p></div>
             <div><p className="text-xs text-gray-400">0-60 mph</p><p className="font-bold text-sm text-gray-800 dark:text-gray-200">{car.acceleration || "3.8s"}</p></div>
             <div><p className="text-xs text-gray-400">Top Speed</p><p className="font-bold text-sm text-gray-800 dark:text-gray-200">{car.topSpeed || "180"} mph</p></div>
          </div>
        </CardBody>
      </Card>

      {/* Features & Amenities */}
      <Card className="mb-8 bg-white dark:bg-gray-90 border border-grayLight dark:border-dark shadow-sm rounded-2xl overflow-hidden">
        <CardBody className="p-8 dark:bg-softBlack bg-white  text-surface">
          <Typography className="text-surface dark:text-grayLight  font-bold text-lg mb-6">
            Features & Amenities
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
            {(car.features || ["GPS Navigation", "Sunroof", "Heated Seats", "Bluetooth"]).map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-green" />
                <Typography className="text-sm text-gray-600 dark:text-gray">{feature}</Typography>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>



      {/* Rental Policy */}
      <div className="mb-12">
        <Typography
          variant="h3"
          className="text-gray-900 dark:text-white text-2xl font-bold mb-8"
        >
          Rental <span className="text-green dark:text-green">Policy</span>
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            {
              icon: ShieldCheckIcon,
              title: "Full Insurance",
              desc: "Comprehensive coverage included with all rentals.",
            },
            {
              icon: ArrowUturnLeftIcon,
              title: "Free Cancellation",
              desc: "Cancel for free up to 48 hours before pickup.",
            },
            {
              icon: MapPinIcon,
              title: "Flexible Pickup",
              desc: "Pick up and drop off at any of our locations.",
            },
          ].map((policy, i) => (
            <Card
              key={i}
              className="
                bg-white dark:bg-softBlack
             border border-gray dark:border-dark
              shadow-md hover:shadow-lg
               transition-all duration-300
                  hover:-translate-y-1
                      "
            >
              <CardBody className="p-6 text-center">
                <policy.icon className="h-8 w-8 text-green dark:text-green mx-auto mb-3" />

                <Typography className="text-black dark:text-white font-bold mb-2 text-sm">
                  {policy.title}
                </Typography>

                <Typography className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                  {policy.desc}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Similar Cars */}
      {similarCars && similarCars.length > 0 && (
        <div>
          <Typography
            variant="h3"
            className="text-gray-900 dark:text-white text-2xl font-bold mb-8"
          >
            You Might Also{" "}
            <span className="text-green dark:text-green">Like</span>
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {similarCars.slice(0, 3).map((similarCar) => {
              const isAvailable = similarCar.available !== false;
              return (
                <Card
                  key={similarCar.id}
                  className="bg-white border border-gray-200 dark:bg-softBlack dark:border-softBlack  overflow-hidden group h-full flex flex-col transition-colors duration-300"
                >
                  <CardHeader className="relative m-0 rounded-none  h-48 shadow-none">
                    <img
                      src={similarCar.image}
                      alt={`${similarCar.brand} ${similarCar.model}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-3 right-3 bg-darkGreen dark:text-dark backdrop-blur-md px-3 py-1 rounded-lg border border-green">
                      <Typography className="font-bold text-sm">
                        ${similarCar.price}
                        <span className="text-black dark:text-black text-xs font-normal">
                          /day
                        </span>
                      </Typography>
                    </div>
                    <div className="absolute top-3 left-3 bg-darkGreen backdrop-blur-sm px-2 py-0.5 rounded border border-green">
                      <Typography className=" text-[10px] font-bold uppercase tracking-wider">
                        {similarCar.category}
                      </Typography>
                    </div>
                    {!isAvailable && (
                      <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm px-2 py-0.5 rounded border border-red-400">
                        <Typography className="text-white text-[10px] font-bold uppercase tracking-wider">
                          Not Available
                        </Typography>
                      </div>
                    )}
                  </CardHeader>

                  <CardBody className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Typography className="text-gray   dark:text-darkGreen text-[10px] font-bold uppercase tracking-tighter">
                          {similarCar.brand}
                        </Typography>
                        <Typography className="text-gray-900 dark:text-grayLight font-bold text-lg leading-tight">
                          {similarCar.model}
                        </Typography>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <Typography className="text-gray-900 dark:text-white text-xs font-bold">
                          {similarCar.rating}
                        </Typography>
                        <Typography className="text-gray-500 dark:text-gray-400 text-[10px]">
                          ({similarCar.reviews})
                        </Typography>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-4">
                      <MapPinIcon className="h-3 w-3" />
                      <Typography className="text-[11px]">
                        {similarCar.location} • {similarCar.year}
                      </Typography>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: BeakerIcon, value: similarCar.fuelType },
                        { icon: Cog8ToothIcon, value: similarCar.transmission },
                        { icon: UsersIcon, value: `${similarCar.seats} Seats` },
                      ].map(({ icon: Icon, value }, i) => (
                        <div
                          key={i}
                          className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md flex flex-col items-center border border-gray-200 dark:border-white/10"
                        >
                          <Icon className="h-3 w-3 text-gray-400 mb-1" />
                          <Typography className="text-[9px] text-gray-500 dark:text-gray-400 uppercase">
                            {value}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </CardBody>

                  <CardFooter className="p-5 pt-0 mt-auto">
                    <Button
                      fullWidth
                      onClick={() => navigate(`/cars/${similarCar.id}`)}
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
            })}
          </div>
        </div>
      )}
    </div>
  );
}









