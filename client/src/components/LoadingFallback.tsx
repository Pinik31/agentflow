import React from 'react';
import { m } from 'framer-motion';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] w-full">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary-200 opacity-25"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-lg font-medium text-foreground/80">טוען...</p>
      </m.div>
    </div>
  );
};

export default LoadingFallback;