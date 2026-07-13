import React from "react";
import { Link } from "react-router-dom";
import { FiLock, FiLogIn } from "react-icons/fi";
import { useAuth } from "./AuthContext";

const LoggedUsers = ({ children }) => {
  const { logged } = useAuth();

  if (!logged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark px-6 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-surface border border-gray-200 dark:border-lightDark rounded-2xl shadow-lg p-8 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-green/10 flex items-center justify-center">
            <FiLock className="text-green text-4xl" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-black dark:text-white">
            Login Required
          </h1>

          <p className="mt-3 text-gray dark:text-grayLight leading-relaxed">
            You must be logged in to access this page.
            <br />
            Please sign in to continue.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green px-6 py-3 text-white font-semibold hover:bg-darkGreen transition"
          >
            <FiLogIn />
            Login
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default LoggedUsers;