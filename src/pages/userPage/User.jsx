import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  PencilSquareIcon, 
  Cog6ToothIcon, 
  BookmarkIcon, 
  CreditCardIcon 
} from '@heroicons/react/24/outline';

const User = () => {
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <aside className="w-64 bg-dark text-white hidden lg:flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">r</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight lowercase">rahalcar</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <Link to="/user" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl transition text-white">
            <UserIcon className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </Link>
          <Link to="/reservation" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition text-gray-400 hover:text-white">
            <BookmarkIcon className="w-5 h-5" />
            <span>My Bookings</span>
          </Link>
          <Link to="/checkout" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition text-gray-400 hover:text-white">
            <CreditCardIcon className="w-5 h-5" />
            <span>Payment Methods</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition text-gray-400 hover:text-white">
            <Cog6ToothIcon className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 p-6 md:p-12 mt-10">
        <header className="mb-10 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">User Profile Dashboard</h2>
        </header>

        {/* User Profile Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-10 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 shadow-inner">
                <UserIcon className="w-20 h-20 text-gray-300" />
              </div>
              <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-green transition">
                <PencilSquareIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
                {userData.name}
              </h3>
              
              <div className="space-y-3 inline-block md:block">
                <div className="flex items-center gap-3 text-gray-500 hover:text-gray-800 transition cursor-default">
                  <EnvelopeIcon className="w-5 h-5 text-green" />
                  <span className="text-lg">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 hover:text-gray-800 transition cursor-default">
                  <PhoneIcon className="w-5 h-5 text-green" />
                  <span className="text-lg">{userData.phone}</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="w-full md:w-auto">
              <button className="w-full flex items-center justify-center gap-2 bg-dark text-white px-8 py-4 rounded-2xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all font-semibold shadow-lg">
                <PencilSquareIcon className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default User;