import React, { useState, useEffect } from "react";
import { UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Nav from '../../../components/user/navbar/Nav';
import Footer from '../../../components/common/Footer/Footer';
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";


const User = () => {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const response = await api.get("/bookings");

        setBookings(response.data);

      } catch (error) {

        console.log(error.response?.data || error.message);

      }

    };


    fetchBookings();

  }, []);



  return (
    <>
      <Nav />


      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg8 mt-10">

        <div className="max-w-md w-full space-y-8 bg-white">


          {/* Profile Header */}

          <div className="text-center">


            <div className="mx-auto w-24 h-24 rounded-full bg-[#22c55e] flex items-center justify-center">

              <UserIcon className="h-12 w-12 text-white" />

            </div>



            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900">

              Welcome{" "}

              <span className="text-green">
                {user?.name}
              </span>

            </h2>



            <p className="mt-2 text-gray-500 text-sm">
              Your RahalCar Profile
            </p>


          </div>





          {/* User Information */}


          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-5">


            <div className="flex items-center gap-4">

              <EnvelopeIcon className="h-6 w-6 text-gray-400"/>


              <div>

                <p className="text-sm text-gray-500">
                  Email
                </p>


                <p className="font-medium text-gray-900">
                  {user?.email}
                </p>


              </div>

            </div>





            <div className="flex items-center gap-4">


              <PhoneIcon className="h-6 w-6 text-gray-400"/>


              <div>

                <p className="text-sm text-gray-500">
                  Phone
                </p>


                <p className="font-medium text-gray-900">

                  {user?.phone || "Not added"}

                </p>


              </div>


            </div>






            <div className="flex items-center gap-4">


              <MapPinIcon className="h-6 w-6 text-gray-400"/>


              <div>

                <p className="text-sm text-gray-500">
                  Address
                </p>


                <p className="font-medium text-gray-900">

                  {user?.address || "Not added"}

                </p>


              </div>


            </div>



          </div>







          {/* Booking History */}


          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">


            <h3 className="text-xl font-bold text-gray-900 mb-5">

              Booking History

            </h3>




            {
              bookings.length === 0 ? (

                <p className="text-gray-500 text-sm text-center">

                  No bookings yet

                </p>


              ) : (


                <div className="space-y-4">


                  {
                    bookings.map((booking)=>(


                      <div

                        key={booking.id}

                        className="bg-white border border-gray-200 rounded-xl p-4"

                      >


                        <div className="flex justify-between items-center">


                          <h4 className="font-bold text-gray-900">

                            {booking.carName}

                          </h4>


                          <span className="text-sm text-green-600 font-semibold">

                            {booking.status}

                          </span>


                        </div>





                        <p className="text-sm text-gray-500 mt-2">

                          {booking.startDate} - {booking.endDate}

                        </p>





                        <p className="mt-2 font-bold text-gray-900">

                          Total: ${booking.totalPrice}

                        </p>





                        <p className="text-sm text-gray-500">

                          Payment: {booking.paymentMethod || "Not paid"}

                        </p>



                      </div>


                    ))
                  }


                </div>


              )

            }



          </div>







          {/* Buttons */}



          <div className="space-y-4">


            <button

              className="w-full py-4 px-4 rounded-xl bg-[#22c55e] text-black font-bold hover:opacity-90 transition-all"

            >

              Edit Profile

            </button>





            <button

              onClick={handleLogout}

              className="w-full py-4 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-bold hover:bg-white transition-all"

            >

              Logout

            </button>



          </div>




        </div>


      </main>



      <Footer />

    </>
  );
};


export default User;