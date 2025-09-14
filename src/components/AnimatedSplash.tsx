import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AnimatedSplashProps {
  onComplete?: () => void;
}

const AnimatedSplash = ({ onComplete }: AnimatedSplashProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 300);
    const timer2 = setTimeout(() => setShowText(true), 1200);
    const timer3 = setTimeout(() => setFadeOut(true), 2800);
    const timer4 = setTimeout(() => {
      if (onComplete) onComplete();
      else navigate("/onboarding");
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate, onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 transition-all duration-700 ${
        fadeOut ? "opacity-0 blur-md" : "opacity-100 blur-0"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center relative z-10">
        {/* Logo */}
        <div
          className={`mb-10 transition-all duration-1000 transform ${
            showLogo
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-50 opacity-0 translate-y-10"
          }`}
        >
          <div className="w-28 h-28 mx-auto bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(180,100,255,0.6)] animate-glow">
            <svg
              className="w-14 h-14 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
        </div>

        {/* Website Name */}
        <div
          className={`transition-all duration-1000 ${
            showText
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-widest relative">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-shimmer">
              ELEVEN
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-widest opacity-90">
            VOICE AI PLATFORM
          </p>
        </div>

        {/* Loading Indicator */}
        <div
          className={`mt-12 transition-all duration-700 ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-center space-x-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-wave"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
          <p className="text-gray-400 mt-4 text-sm tracking-wide">
            Preparing your experience...
          </p>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default AnimatedSplash;
