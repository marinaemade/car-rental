import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-dark transition-colors duration-300">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-grayLight dark:border-lightDark"></div>

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green border-r-green animate-spin"></div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold text-black dark:text-white">
            Loading...
          </p>

          <p className="mt-1 text-sm text-gray dark:text-grayLight animate-pulse">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;