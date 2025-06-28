import React from 'react';

export const Badge: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-badge pointer-events-auto">
      <img 
        src="/black_circle_360x360.png" 
        alt="Powered by Bolt" 
        className="w-16 h-16 opacity-80 hover:opacity-100 transition-opacity duration-200"
        title="Powered by Bolt"
      />
    </div>
  );
};