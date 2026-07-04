import React, { useState, useEffect, useContext } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiX, FiCheck, FiDollarSign } from 'react-icons/fi';
import { FaCarSide } from 'react-icons/fa6';
import { ThemeContext } from './../../../context/ThemeContext'; 

const ProfileTab = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  // Form & Loading States (Ready for Backend Integration)
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState({
    name: 'Marina Emad',
    email: 'marmouraemade@gmail.com',
    phone: '+20 123 456 7890',
    location: 'Giza, Egypt',
  });

  // Edit states
  const [formData, setFormData] = useState({ ...userData });
  const [isEditing, setIsEditing] = useState(false);

  // Mock stats styled with icons
  const stats = [
    { id: 1, label: 'Total Bookings', value: '0', icon: <FaCarSide className="w-5 h-5" /> },
    { id: 2, label: 'Active Rentals', value: '0', icon: <FiCheck className="w-5 h-5" /> },
    { id: 3, label: 'Total Spent', value: '$0', icon: <FiDollarSign className="w-5 h-5" /> },
  ];

  // Sync data if loaded from an external backend API later
  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      // API call placeholder:
      // await axios.put('/api/user/profile', formData);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setUserData({ ...formData });
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Theme Styling Classes 
  const bgClass = isDarkMode ? 'bg-dark text-white' : 'bg-white text-black';
  const cardBgClass = isDarkMode ? 'bg-surface' : 'bg-grayLight bg-opacity-30';
  const inputBgClass = isDarkMode ? 'bg-softBlack border-lightDark text-white' : 'bg-white border-gray text-black';
  const borderClass = isDarkMode ? 'border-lightDark' : 'border-grayLight';
  const textMutedClass = isDarkMode ? 'text-gray' : 'text-lightDark';

  return (
    <div className={`mt-16 min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-300 ${bgClass}`}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Success Alert */}
        {successMessage && (
          <div className="p-4 rounded-lg bg-green bg-opacity-20 border border-green text-green font-medium flex items-center gap-2 animate-fade-in">
            <FiCheck className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {/* Header/Hero Section */}
        <div className={`p-6 sm:p-8 rounded-2xl border ${borderClass} ${cardBgClass} flex flex-col sm:flex-row items-center gap-6`}>
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-green/20">
            {formData.name ? formData.name.charAt(0).toUpperCase() : 'M'}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, <span className="text-green">{formData.name.split(' ')[0].toLowerCase()}</span>!
            </h1>
            <p className={`text-sm mt-1 ${textMutedClass}`}>{formData.email}</p>
          </div>
          <button
            onClick={() => {
              if (isEditing) setFormData({ ...userData });
              setIsEditing(!isEditing);
            }}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium transition-all duration-200 border flex items-center justify-center gap-2 ${
              isEditing 
                ? 'border-gray text-gray hover:bg-gray hover:bg-opacity-10' 
                : 'bg-green border-green text-white hover:bg-darkGreen shadow-lg shadow-green/10'
            }`}
          >
            {isEditing ? (
              <>
                <FiX className="w-4 h-4" /> Cancel
              </>
            ) : (
              <>
                <FiEdit2 className="w-4 h-4" /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Stats Grid Dashboard Style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className={`p-5 rounded-xl border ${borderClass} ${cardBgClass} flex items-center justify-between transition-transform hover:scale-[1.01]`}
            >
              <div>
                <p className={`text-xs font-medium uppercase tracking-wider ${textMutedClass}`}>
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="p-3 rounded-xl bg-green bg-opacity-10 text-green">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Main Details & Settings Form */}
        <div className={`p-6 sm:p-8 rounded-2xl border ${borderClass} ${cardBgClass}`}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2.5 h-5 bg-green rounded-full inline-block"></span>
            Account Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="relative">
                <label className={`block text-sm font-medium mb-2 ${textMutedClass}`}>Full Name</label>
                <div className="relative">
                  <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 ${textMutedClass} w-5 h-5`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:border-green ${inputBgClass} ${
                      !isEditing ? 'opacity-60 cursor-not-allowed' : 'focus:ring-2 focus:ring-green/20'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${textMutedClass}`}>Email Address</label>
                <div className="relative">
                  <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 ${textMutedClass} w-5 h-5`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:border-green ${inputBgClass} ${
                      !isEditing ? 'opacity-60 cursor-not-allowed' : 'focus:ring-2 focus:ring-green/20'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${textMutedClass}`}>Phone Number</label>
                <div className="relative">
                  <FiPhone className={`absolute left-4 top-1/2 -translate-y-1/2 ${textMutedClass} w-5 h-5`} />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:border-green ${inputBgClass} ${
                      !isEditing ? 'opacity-60 cursor-not-allowed' : 'focus:ring-2 focus:ring-green/20'
                    }`}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${textMutedClass}`}>Location</label>
                <div className="relative">
                  <FiMapPin className={`absolute left-4 top-1/2 -translate-y-1/2 ${textMutedClass} w-5 h-5`} />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:border-green ${inputBgClass} ${
                      !isEditing ? 'opacity-60 cursor-not-allowed' : 'focus:ring-2 focus:ring-green/20'
                    }`}
                  />
                </div>
              </div>

            </div>

            {/* Action Buttons for Save */}
            {isEditing && (
              <div className="flex justify-end pt-4 border-t border-lightDark border-opacity-40">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green text-white font-medium hover:bg-darkGreen transition-all duration-200 shadow-lg shadow-green/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfileTab;