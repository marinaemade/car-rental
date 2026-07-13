import React, { useState, useContext, useEffect } from 'react';
import { FiCalendar, FiCheckCircle, FiClock, FiXCircle, FiPlus, FiArrowRight, FiEdit2, FiCheck, FiX, FiExternalLink } from 'react-icons/fi';
import { FaCarSide } from 'react-icons/fa6';
import { ThemeContext } from './../../../context/ThemeContext'; 
import { useNavigate } from 'react-router-dom';
import Loading from './../../../components/common/Loading/Loading';
import { fetchBookings, updateBooking } from "./../../../api/BookingApi";

const BookingsTab = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate();

  const loadBookings = () => {
    setLoading(true);
    fetchBookings()
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error(error);
        setBookings([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleEditClick = (booking) => {
    setEditingId(booking.id);
    setEditStatus(booking.status);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditStatus('');
  };

  const handleSaveStatus = async (id) => {
    setUpdatingId(id);
    try {
      await updateBooking(id, { status: editStatus });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: editStatus } : b));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update status. Please make sure you are logged in.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const bgClass = isDarkMode ? 'bg-dark text-white' : 'bg-white text-black';
  const cardBgClass = isDarkMode ? 'bg-surface' : 'bg-grayLight bg-opacity-30';
  const borderClass = isDarkMode ? 'border-lightDark' : 'border-grayLight';
  const textMutedClass = isDarkMode ? 'text-gray' : 'text-lightDark';
  const emptyBoxBg = isDarkMode ? 'bg-softBlack' : 'bg-grayLight bg-opacity-20';

  const filterTabs = ['all', 'Confirmed', 'past', 'cancelled'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green bg-opacity-20 text-green border border-green border-opacity-30 flex items-center gap-1 w-fit"><FiCheckCircle /> Confirmed</span>;
      case 'past':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray bg-opacity-20 text-gray border border-gray border-opacity-30 flex items-center gap-1 w-fit"><FiClock /> Past</span>;
      case 'cancelled':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500 bg-opacity-20 text-red-500 border border-red-500 border-opacity-30 flex items-center gap-1 w-fit"><FiXCircle /> Cancelled</span>;
      default:
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-400 bg-opacity-20 text-gray-400 border border-gray-400 border-opacity-30 w-fit capitalize">{status}</span>;
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
          
          <button onClick={() => navigate("/cars")} className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium bg-green border border-green text-white hover:bg-darkGreen shadow-lg shadow-green/10 flex items-center justify-center gap-2 transition-all duration-200">
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
          <Loading/>
        ) : filteredBookings.length === 0 ? (
          
          <div className={`p-12 sm:p-20 rounded-2xl border ${borderClass} ${cardBgClass} flex flex-col items-center justify-center text-center`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-gray ${emptyBoxBg}`}>
              <FaCarSide className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-1">No bookings yet</h3>
            <p className={`text-sm max-w-xs mb-6 ${textMutedClass}`}>
              You haven't made any bookings yet. Find the perfect vehicle for your next trip!
            </p>
            <button onClick={() => navigate("/cars")} className="px-6 py-2.5 rounded-xl bg-green hover:bg-darkGreen text-white font-medium shadow-lg shadow-green/20 transition-all duration-200">
              Browse Cars
            </button>
          </div>

        ) : (
          
          <div>
            {/* Desktop View */}
            <div className={`hidden md:block rounded-2xl border ${borderClass} ${cardBgClass} overflow-hidden`}>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className={`border-b ${borderClass} bg-opacity-40 bg-black text-xs font-semibold uppercase tracking-wider ${textMutedClass}`}>
                    <th className="p-4 pl-6">ID</th>
                    <th className="p-4">Car Details</th>
                    <th className="p-4">Rental Duration</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
 <tbody className="divide-y divide-lightDark divide-opacity-40">
  {filteredBookings.map((booking) => (
    <tr key={booking.id} className="hover:bg-gray hover:bg-opacity-5 transition-colors">
      <td className="p-4 pl-6 font-mono text-xs font-semibold max-w-[120px] truncate" title={booking.id}>
        {booking.id}
      </td>
      <td className="p-4">
        {/* Flex layout holding the name and an explicit View button */}
        <div className="flex items-center gap-3">
          <span className="font-bold">{booking.carName}</span>
          <button 
            onClick={() => navigate(`/cars/${booking.carId || booking.car?.id || booking.id}`)}
            className="px-2.5 py-1 text-xs font-medium rounded-lg border border-green text-green hover:bg-green hover:text-white flex items-center gap-1 transition-all"
            title="View Vehicle Details"
          >
            View Car <FiExternalLink className="w-3 h-3" />
          </button>
        </div>
      </td>
      <td className="p-4 text-sm">
        <div className="flex items-center gap-2">
          <span>{booking.startDate}</span>
          <FiArrowRight className="text-green text-xs" />
          <span>{booking.endDate}</span>
        </div>
      </td>
      <td className="p-4 font-bold text-green">$ {booking.totalPrice} </td>
      <td className="p-4">
        {editingId === booking.id ? (
          <select 
            value={editStatus} 
            onChange={(e) => setEditStatus(e.target.value)}
            className={`p-1.5 text-xs rounded-lg border ${borderClass} bg-transparent focus:outline-none focus:border-green`}
          >
            <option value="Confirmed" className="text-black">Confirmed</option>
            <option value="past" className="text-black">Past</option>
            <option value="cancelled" className="text-black">Cancelled</option>
          </select>
        ) : (
          getStatusBadge(booking.status)
        )}
      </td>
      <td className="p-4 pr-6 text-right">
        <div className="flex justify-end items-center gap-2">
          {editingId === booking.id ? (
            <>
              <button 
                onClick={() => handleSaveStatus(booking.id)}
                disabled={updatingId === booking.id}
                className="p-1.5 bg-green bg-opacity-20 text-green rounded-lg hover:bg-opacity-30 transition-all"
                title="Save Changes"
              >
                <FiCheck />
              </button>
              <button 
                onClick={handleCancelEdit}
                className="p-1.5 bg-red-500 bg-opacity-20 text-red-500 rounded-lg hover:bg-opacity-30 transition-all"
                title="Cancel"
              >
                <FiX />
              </button>
            </>
          ) : (
            <button 
              onClick={() => handleEditClick(booking)}
              className={`p-1.5 rounded-lg border ${borderClass} hover:bg-green hover:text-white transition-all`}
              title="Edit Status"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>

            {/* Mobile/Tablet View */}
            <div className="md:hidden space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className={`p-5 rounded-xl border ${borderClass} ${cardBgClass} space-y-4`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-1 bg-opacity-20 bg-gray rounded text-gray max-w-[140px] truncate" title={booking.id}>
                      {booking.id}
                    </span>
                    
                    {editingId === booking.id ? (
                      <select 
                        value={editStatus} 
                        onChange={(e) => setEditStatus(e.target.value)}
                        className={`p-1 text-xs rounded-lg border ${borderClass} bg-transparent focus:outline-none`}
                      >
                        <option value="active" className="text-black">Confirmed</option>
                        <option value="past" className="text-black">Past</option>
                        <option value="cancelled" className="text-black">Cancelled</option>
                      </select>
                    ) : (
                      getStatusBadge(booking.status)
                    )}
                  </div>
                  
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-lg">{booking.carName}</h4>
                      <div className={`text-xs mt-1 flex items-center gap-2 ${textMutedClass}`}>
                        <span>{booking.startDate}</span>
                        <FiArrowRight className="text-green" />
                        <span>{booking.endDate}</span>
                      </div>
                    </div>
                    {/* View Vehicle Button next to title for easy access on small viewports */}
                    <button
                      onClick={() => navigate(`/cars/${booking.carId || booking.car?.id || booking.id}`)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${borderClass} text-green flex items-center gap-1 whitespace-nowrap`}
                    >
                      View Car
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-lightDark border-opacity-40">
                    <div>
                      <span className={`text-xs font-medium uppercase tracking-wider block ${textMutedClass}`}>Total Price</span>
                      <span className="font-bold text-lg text-green">{booking.totalPrice}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {editingId === booking.id ? (
                        <>
                          <button 
                            onClick={() => handleSaveStatus(booking.id)}
                            disabled={updatingId === booking.id}
                            className="px-3 py-1.5 text-xs font-medium bg-green text-white rounded-lg flex items-center gap-1"
                          >
                            <FiCheck /> Save
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white rounded-lg flex items-center gap-1"
                          >
                            <FiX /> Cancel
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleEditClick(booking)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${borderClass} flex items-center gap-1`}
                        >
                          <FiEdit2 /> Edit Status
                        </button>
                      )}
                    </div>
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