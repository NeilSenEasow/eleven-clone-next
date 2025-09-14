const BackgroundWaves = () => {
  return (
    <>
      <style>{`
        @keyframes wave-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes wave-medium {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes wave-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-wave-slow {
          animation: wave-slow 20s linear infinite;
        }

        .animate-wave-medium {
          animation: wave-medium 15s linear infinite;
        }

        .animate-wave-fast {
          animation: wave-fast 10s linear infinite;
        }
      `}</style>
      
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none overflow-hidden z-0">
        <div className="relative w-full h-64">
          {/* First wave */}
          <div className="absolute bottom-0 left-0 animate-wave-slow" style={{ width: '200%' }}>
            <svg
              viewBox="0 0 2400 200"
              className="w-full h-64"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(220 70% 80%)" stopOpacity="0.3" />
                  <stop offset="25%" stopColor="hsl(258 90% 66%)" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="hsl(280 90% 70%)" stopOpacity="0.3" />
                  <stop offset="75%" stopColor="hsl(258 90% 66%)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(220 70% 80%)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M0,100 C200,150 400,50 600,100 C800,150 1000,50 1200,100 C1400,150 1600,50 1800,100 C2000,150 2200,50 2400,100 L2400,200 L0,200 Z"
                fill="url(#wave1)"
              />
            </svg>
          </div>
          
          {/* Second wave */}
          <div className="absolute bottom-0 left-0 animate-wave-fast" style={{ width: '200%' }}>
            <svg
              viewBox="0 0 2400 200"
              className="w-full h-64"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(258 90% 66%)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="hsl(300 85% 75%)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="hsl(258 90% 66%)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M0,120 C300,80 600,160 900,120 C1200,80 1500,160 1800,120 C2100,80 2400,160 2400,120 L2400,200 L0,200 Z"
                fill="url(#wave2)"
              />
            </svg>
          </div>

          {/* Third wave for more depth */}
          <div className="absolute bottom-0 left-0 animate-wave-medium" style={{ width: '200%' }}>
            <svg
              viewBox="0 0 2400 200"
              className="w-full h-64"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(240 80% 85%)" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="hsl(320 75% 80%)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(240 80% 85%)" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <path
                d="M0,140 C250,100 500,180 750,140 C1000,100 1250,180 1500,140 C1750,100 2000,180 2250,140 C2400,120 2400,140 2400,140 L2400,200 L0,200 Z"
                fill="url(#wave3)"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackgroundWaves;