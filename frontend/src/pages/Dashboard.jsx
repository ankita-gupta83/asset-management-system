import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/assets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setAssets(data);
    } catch (error) {
      console.error("Failed to fetch assets");
    }
  };

  // 🧠 NORMALIZED STATUS (DO NOT CHANGE)
  const normalizedAssets = assets.map((asset) => {
    if (asset.condition === "damaged") {
      return { ...asset, status: "unavailable" };
    }
    return asset;
  });

  // 🔢 COUNTS (DO NOT CHANGE)
  const totalAssets = normalizedAssets.length;
  const assignedAssets = normalizedAssets.filter(
    (asset) => asset.status === "assigned"
  ).length;
  const availableAssets = normalizedAssets.filter(
    (asset) => asset.status === "available"
  ).length;
  const unavailableAssets = normalizedAssets.filter(
    (asset) => asset.status === "unavailable"
  ).length;
  const workingAssets = normalizedAssets.filter(
    (asset) => asset.condition === "working"
  ).length;
  const damagedAssets = normalizedAssets.filter(
    (asset) => asset.condition === "damaged"
  ).length;

  const recentAssets = [...normalizedAssets]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-[#f8fafc] to-[#eef2f7] px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          A calm overview of your assets
        </p>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <SummaryCard title="Total Assets" value={totalAssets} />

          <SummaryCard
            title="Assigned"
            value={assignedAssets}
            accent="border-red-200 text-red-500"
          />

          <SummaryCard
            title="Available"
            value={availableAssets}
            accent="border-green-200 text-green-600"
          />

          <SummaryCard
            title="Unavailable"
            value={unavailableAssets}
            accent="border-yellow-200 text-yellow-600"
          />

          <SummaryCard
            title="Working"
            value={workingAssets}
            accent="border-teal-200 text-teal-600"
          />

          <SummaryCard
            title="Damaged"
            value={damagedAssets}
            accent="border-rose-200 text-rose-600"
          />
        </div>

        {/* RECENT ASSETS */}
        <div className="bg-white/80 backdrop-blur mt-12 rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Assets
          </h2>

          {recentAssets.length === 0 ? (
            <p className="text-gray-500">No assets found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-175 w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-400 border-b">
                    <th className="pb-3">Asset</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Assigned To</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Condition</th>
                  </tr>
                </thead>

                <tbody>
                  {recentAssets.map((asset) => (
                    <tr
                      key={asset._id}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="py-3 sm:py-4 font-medium text-gray-800">
                        {asset.assetName}
                      </td>

                      <td className="text-gray-600">
                        {asset.assetType}
                      </td>

                      <td className="text-gray-600">
                        {asset.assignedTo || "—"}
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            asset.status === "available"
                              ? "bg-green-100 text-green-700"
                              : asset.status === "assigned"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            asset.condition === "working"
                              ? "bg-teal-50 text-teal-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {asset.condition}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* 🌸 Soft Pastel Card Component */
function SummaryCard({ title, value, accent = "" }) {
  return (
    <div
      className={`bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border ${
        accent || "border-gray-100"
      }`}
    >
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl sm:text-3xl font-semibold mt-2">
        {value}
      </h2>
    </div>
  );
}

export default Dashboard;
