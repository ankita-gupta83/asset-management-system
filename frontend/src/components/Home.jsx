import Navbar from "./Navbar";
import BackgroundWrapper from "./BackgroundWrapper";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const goToAssets = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/assets");
    }
  };

  const goToDash = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/dash");
    }
  };

  return (
    <BackgroundWrapper>
      <Navbar />

      <div className="relative overflow-hidden">

        {/* BACKGROUND BLURS */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-40"></div>

        {/* HERO SECTION */}
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-gray-200 text-sm text-gray-600 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Smart asset management system
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-800 leading-tight">
              Manage your assets
              <br />
              <span className="text-gray-500">
                with clarity & calm
              </span>
            </h1>

            <p className="text-gray-500 mt-6 max-w-lg mx-auto md:mx-0 text-lg leading-relaxed">
              A simple and secure way to organize company assets,
              monitor assignments and keep workflows clean without clutter.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-5 mt-10">

              <button
                onClick={goToAssets}
                className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3.5 rounded-2xl shadow-sm hover:bg-gray-800 transition"
              >
                Go to Assets
              </button>

              <span
                onClick={goToDash}
                className="text-gray-600 hover:text-gray-800 cursor-pointer underline underline-offset-4 transition"
              >
                Go to dashboard →
              </span>
            </div>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14">

              <div className="bg-white/70 backdrop-blur border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-4 text-lg">
                  🔐
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  Secure Login
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  JWT based authentication system.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center mb-4 text-lg">
                  📦
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  Asset Tracking
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Easy asset assignment workflow.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-4 text-lg">
                  💻
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  Responsive UI
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Optimized for desktop and mobile.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">

            {/* DASHBOARD PREVIEW */}
            <div className="bg-white/75 backdrop-blur rounded-3xl p-8 sm:p-10 shadow-md border border-gray-100">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Dashboard Preview
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Clean overview of assets and workflow
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                  Simple UI
                </div>
              </div>

              <div className="space-y-5">

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100">

                  <div>
                    <h4 className="font-medium text-gray-700">
                      Laptop Asset
                    </h4>

                    <p className="text-sm text-gray-500">
                      Assigned and tracked securely
                    </p>
                  </div>

                  <span className="text-sm text-teal-600 font-medium">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100">

                  <div>
                    <h4 className="font-medium text-gray-700">
                      Asset Inventory
                    </h4>

                    <p className="text-sm text-gray-500">
                      Organized asset records
                    </p>
                  </div>

                  <span className="text-sm text-indigo-600 font-medium">
                    Updated
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100">

                  <div>
                    <h4 className="font-medium text-gray-700">
                      Dashboard Access
                    </h4>

                    <p className="text-sm text-gray-500">
                      Protected route management
                    </p>
                  </div>

                  <span className="text-sm text-amber-600 font-medium">
                    Secure
                  </span>
                </div>

              </div>
            </div>

            {/* SMALL FEATURE GRID */}
            <div className="grid grid-cols-2 gap-5">

              <div className="bg-white/70 border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h4 className="font-medium text-gray-800 mb-2">
                  Minimal Design
                </h4>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Clean layouts with calm visual hierarchy.
                </p>
              </div>

              <div className="bg-white/70 border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h4 className="font-medium text-gray-800 mb-2">
                  Smooth Experience
                </h4>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Simple navigation and user-friendly flow.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 pb-20">

          <div className="bg-white/60 backdrop-blur border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Built with simplicity in mind
                </h2>

                <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
                  Designed to make asset management feel clean,
                  modern and easy to understand without unnecessary complexity.
                </p>
              </div>

              <button
                onClick={goToDash}
                className="bg-gray-900 text-white px-7 py-3 rounded-2xl hover:bg-gray-800 transition"
              >
                Open Dashboard
              </button>

            </div>
          </div>
        </div>

      </div>
    </BackgroundWrapper>
  );
}

export default Home;