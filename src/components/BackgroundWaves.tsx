const BackgroundWaves = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none overflow-hidden z-0">
      <div className="relative w-full h-64">
        {/* First wave */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          <svg
            viewBox="0 0 1200 200"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(220 70% 80%)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(258 90% 66%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(280 90% 70%)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M0,100 C300,150 900,50 1200,100 L1200,200 L0,200 Z"
              fill="url(#wave1)"
            />
          </svg>
        </div>
        
        {/* Second wave */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          <svg
            viewBox="0 0 1200 200"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(258 90% 66%)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(300 85% 75%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M0,120 C400,80 800,160 1200,120 L1200,200 L0,200 Z"
              fill="url(#wave2)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BackgroundWaves;