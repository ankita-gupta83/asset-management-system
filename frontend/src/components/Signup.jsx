import { useState } from "react";
import BackgroundWrapper from "./BackgroundWrapper"; 

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://asset-management-backend-kpqm.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Signup successful");
    } else {
      alert(data.message);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Create Account</h1>
            <p className="text-sm text-gray-500 mt-1">Get started with asset management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                name="name"
                placeholder="Your name"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                required
              />
            </div>

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
              Signup
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?
            <a
              href="/login"
              className="text-gray-900 font-medium ml-1 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </BackgroundWrapper>
  );
}

export default Signup;
