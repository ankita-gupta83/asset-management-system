import React from "react";

function BackgroundWrapper({ children }) {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/images/hero.png')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Optional overlay for softening the background */}
      <div className="absolute inset-0 bg-white/30"></div>

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default BackgroundWrapper;
