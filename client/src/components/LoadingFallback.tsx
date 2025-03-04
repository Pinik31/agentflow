
import React from 'react';
import { m } from 'framer-motion';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <m.div 
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
        </div>
        <p className="text-muted-foreground animate-pulse">טוען...</p>
      </m.div>
    </div>
  );
};

export default LoadingFallback;
import React from 'react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
