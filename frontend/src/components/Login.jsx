import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "./BackgroundWrapper"; 

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://asset-management-backend-kpqm.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <BackgroundWrapper>
      
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Login to manage your assets</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?
            <a
              href="/signup"
              className="text-gray-900 font-medium ml-1 hover:underline"
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    </BackgroundWrapper>
  );
}

export default Login;
