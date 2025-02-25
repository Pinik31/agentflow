import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function ServiceCard({ title, description, imageUrl, href, className, icon }: ServiceCardProps) {
  return (
    <div 
      className={`group relative overflow-hidden rounded-xl card-hover glow-hover border border-primary/5 hover:border-primary/20 bg-background/60 backdrop-blur-sm shadow-md transition-all duration-500 h-full ${className}`}
      onClick={() => window.location.href = href}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      
      <div className="relative p-6 pt-52">
        {icon && (
          <div className="absolute top-4 right-4 rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-20">
            <div className="text-primary">
              {icon}
            </div>
          </div>
        )}
        
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 mb-4">{description}</p>
        
        <div className="flex justify-end">
          <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300 cursor-pointer">
            מידע נוסף
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-3 left-3 w-10 h-10 border border-primary/10 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 rotate-12"></div>
      </div>
    </div>
  );
}