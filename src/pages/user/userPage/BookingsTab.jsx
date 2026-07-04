import React, { useState, useContext, useEffect } from 'react';
import { FiCalendar, FiCheckCircle, FiClock, FiXCircle, FiPlus, FiArrowRight } from 'react-icons/fi';
import { FaCarSide } from 'react-icons/fa6';
import { ThemeContext } from './../../../context/ThemeContext'; 
import { useNavigate } from 'react-router-dom';

const BookingsTab = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  // Active filter tab state ("all", "active", "past", "cancelled")
  const [activeTab, setActiveTab] = useState('all');
  
  // Ready for Backend: Replace this initial state array with your API call data (e.g., fetch from /api/bookings)
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Mocking initial data fetch 
  useEffect(() => {
    setLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
      // Set to empty array [] to see the "No bookings yet" screen from image_b9ec32.png
      // Or populate with objects to test your table rows
      setBookings([

        {
          id: "BK-8832",
          carName: "Tesla Model Y (2024)",
          startDate: "2026-07-10",
          endDate: "2026-07-15",
          totalPrice: "$450",
          status: "past" // active | past | cancelled
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Filter logic
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  // Dynamic Theme Styling Classes
  const bgClass = isDarkMode ? 'bg-dark text-white' : 'bg-white text-black';
  const cardBgClass = isDarkMode ? 'bg-surface' : 'bg-grayLight bg-opacity-30';
  const borderClass = isDarkMode ? 'border-lightDark' : 'border-grayLight';
  const textMutedClass = isDarkMode ? 'text-gray' : 'text-lightDark';
  const emptyBoxBg = isDarkMode ? 'bg-softBlack' : 'bg-grayLight bg-opacity-20';

  const filterTabs = ['all', 'active', 'past', 'cancelled'];

  // Helper badge style for statuses
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green bg-opacity-20 text-green border border-green border-opacity-30 flex items-center gap-1 w-fit"><FiCheckCircle /> Active</span>;
      case 'past':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray bg-opacity-20 text-gray border border-gray border-opacity-30 flex items-center gap-1 w-fit"><FiClock /> Past</span>;
      case 'cancelled':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500 bg-opacity-20 text-red-500 border border-red-500 border-opacity-30 flex items-center gap-1 w-fit"><FiXCircle /> Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`mt-14 min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-300 ${bgClass}`}>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green bg-opacity-10 text-green rounded-lg">
              <FiCalendar className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">My Bookings</h2>
          </div>
          
          <button onClick={() => navigate("/cars")}  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium bg-green border border-green text-white hover:bg-darkGreen shadow-lg shadow-green/10 flex items-center justify-center gap-2 transition-all duration-200">
            <FiPlus className="w-5 h-5" /> New Booking
          </button>
        </div>

        {/* Filter Navigation Tabs Bar */}
        <div className={`p-1.5 rounded-xl border ${borderClass} ${cardBgClass} flex flex-wrap gap-1 max-w-md`}>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[70px] py-2 text-sm font-medium rounded-lg capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-green text-white shadow-md'
                  : `hover:bg-opacity-10 hover:bg-gray ${textMutedClass}`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <svg className="animate-spin h-8 w-8 text-green" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className={`text-sm ${textMutedClass}`}>Loading your rentals...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          
          // Empty State Screen
          <div className={`p-12 sm:p-20 rounded-2xl border ${borderClass} ${cardBgClass} flex flex-col items-center justify-center text-center`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-gray ${emptyBoxBg}`}>
              <FaCarSide className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-1">No bookings yet</h3>
            <p className={`text-sm max-w-xs mb-6 ${textMutedClass}`}>
              You haven't made any bookings yet. Find the perfect vehicle for your next trip!
            </p>
            <button onClick={() => navigate("/cars")}  className="px-6 py-2.5 rounded-xl bg-green hover:bg-darkGreen text-white font-medium shadow-lg shadow-green/20 transition-all duration-200">
              Browse Cars
            </button>
          </div>

        ) : (
          

          <div>
            {/* Desktop View: Clean Table Structure hidden on small devices */}
            <div className={`hidden md:block rounded-2xl border ${borderClass} ${cardBgClass} overflow-hidden`}>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className={`border-b ${borderClass} bg-opacity-40 bg-black text-xs font-semibold uppercase tracking-wider ${textMutedClass}`}>
                    <th className="p-4 pl-6">ID</th>
                    <th className="p-4">Car Details</th>
                    <th className="p-4">Rental Duration</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4 pr-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lightDark divide-opacity-40">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray hover:bg-opacity-5 transition-colors">
                      <td className="p-4 pl-6 font-mono text-sm font-semibold">{booking.id}</td>
                      <td className="p-4 font-medium">{booking.carName}</td>
                      <td className="p-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span>{booking.startDate}</span>
                          <FiArrowRight className="text-green text-xs" />
                          <span>{booking.endDate}</span>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-green">{booking.totalPrice}</td>
                      <td className="p-4 pr-6">{getStatusBadge(booking.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet View: */}
            <div className="md:hidden space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className={`p-5 rounded-xl border ${borderClass} ${cardBgClass} space-y-4`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-1 bg-opacity-20 bg-gray rounded text-gray">
                      {booking.id}
                    </span>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{booking.carName}</h4>
                    <div className={`text-xs mt-1 flex items-center gap-2 ${textMutedClass}`}>
                      <span>{booking.startDate}</span>
                      <FiArrowRight className="text-green" />
                      <span>{booking.endDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-lightDark border-opacity-40">
                    <span className={`text-xs font-medium uppercase tracking-wider ${textMutedClass}`}>Total Price</span>
                    <span className="font-bold text-lg text-green">{booking.totalPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingsTab;