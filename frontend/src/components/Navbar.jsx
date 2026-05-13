import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
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

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
          Asset Manager
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-900">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-800"
              >
                Signup
              </Link>
            </>
          ) : (
            <>

              <Link to="/" className="hover:text-gray-900">
                Home
              </Link>

              <Link to="/assets" className="hover:text-gray-900">
                Assets
              </Link>

              <button
                onClick={logoutHandler}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                  {getInitials(user.name)}
                </div>
                <span className="font-medium text-gray-900">
                  {user.name}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-gray-700 text-xl"
        >
          ☰
        </button>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Right Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden
        transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 space-y-6">
          {/* Sidebar Header */}
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Welcome to Asset Manager
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {!user
                  ? "Access your account or get started"
                  : "Quick access to your workspace"}
              </p>

            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Logged Out */}
          {!user ? (
            <div className="space-y-3 text-sm">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-100 font-medium"
              >
                Login to your account
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 font-medium"
              >
                Create new account
              </Link>
            </div>
          ) : (
            <>
              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                  {getInitials(user.name)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Logged in
                  </p>
                </div>
              </div>

              {/* Links */}
              <nav className="space-y-2 text-sm">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  Home
                </Link>
                <Link
                  to="/assets"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  Assets
                </Link>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logoutHandler();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </nav>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export default Navbar;
