
import React from 'react';
import { motion } from 'framer-motion';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-20 h-20 mb-6">
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-primary-200 dark:border-primary-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
          
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div 
            className="absolute inset-4 rounded-full bg-primary-500/30 backdrop-blur-sm"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <motion.div
          className="text-foreground/80 font-medium text-lg"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          טוען...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingFallback;
