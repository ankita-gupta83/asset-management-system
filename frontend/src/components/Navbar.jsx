import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getInitials = (name = "") => {
    const words = name.trim().split(" ");

    if (words.length === 1) return words[0][0];

    return words[0][0] + words[words.length - 1][0];
  };

  const navLinkStyle = (path) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${location.pathname === path
      ? "bg-gray-900 text-white shadow-sm"
      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

          {/* Left Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white flex items-center justify-center">
              <img
                src="/images/favicon.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-sm md:text-base font-semibold text-gray-900 leading-none">
                Asset Manager
              </h1>

              <p className="text-[11px] text-gray-500 mt-1 hidden sm:block">
                Smart asset workspace
              </p>
            </div>
          </div>

          {/* Center Navigation */}
          {user && (
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-1">
              <Link to="/dash" className={navLinkStyle("/dash")}>
                Dashboard
              </Link>

              <Link to="/" className={navLinkStyle("/")}>
                Home
              </Link>

              <Link
                to="/assets"
                className={navLinkStyle("/assets")}
              >
                Assets
              </Link>
            </div>
          )}

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                {/* User */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                      {getInitials(user.name)}
                    </div>

                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>

                  <div className="hidden lg:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Logged in
                    </p>
                  </div>
                </div>

                <button
                  onClick={logoutHandler}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden
        transition-transform duration-300 ease-out shadow-2xl
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div>
              <h2 className="font-semibold text-gray-900">
                Asset Manager
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Manage your workspace
              </p>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-500 transition"
            >
              ✕
            </button>
          </div>

          {!user ? (
            <div className="mt-6 space-y-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block text-center py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <>
              {/* User Card */}
              <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                    {getInitials(user.name)}
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Welcome back
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-6 flex flex-col space-y-2">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkStyle("/")}
                >
                  Home
                </Link>

                <Link
                  to="/dash"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkStyle("/dash")}
                >
                  Dashboard
                </Link>


                <Link
                  to="/assets"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkStyle("/assets")}
                >
                  Assets
                </Link>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logoutHandler();
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </nav>

              {/* Footer */}
              <div className="mt-auto pt-6 text-center text-xs text-gray-400">
                Asset Manager System
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export default Navbar;