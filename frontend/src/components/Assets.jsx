import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import BackgroundWrapper from "./BackgroundWrapper";

function Assets() {
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [assignInput, setAssignInput] = useState({});

  const [formData, setFormData] = useState({
    assetName: "",
    assetType: "",
    serialNumber: "",
    condition: "working",
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchAssets = async () => {
    const res = await fetch("https://asset-management-backend-kpqm.onrender.com/api/assets", {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      navigate("/login");
      return;
    }

    const data = await res.json();
    setAssets(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchAssets();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://asset-management-backend-kpqm.onrender.com/api/assets", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Add asset failed");
      return;
    }

    setFormData({
      assetName: "",
      assetType: "",
      serialNumber: "",
      condition: "working",
    });

    fetchAssets();
  };

  const assignAsset = async (id) => {
    const assignedTo = assignInput[id];
    if (!assignedTo) {
      alert("Please enter a name to assign");
      return;
    }

    const res = await fetch(`https://asset-management-backend-kpqm.onrender.com/api/assets/${id}/assign`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ assignedTo }),
    });

    if (!res.ok) {
      alert("Assign failed");
      return;
    }

    setAssignInput({});
    fetchAssets();
  };

  const deleteAsset = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await fetch(`https://asset-management-backend-kpqm.onrender.com/api/assets/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    fetchAssets();
  };

  const updateAsset = async (id) => {
    const res = await fetch(`https://asset-management-backend-kpqm.onrender.com/api/assets/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(editData),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    setEditingId(null);
    setEditData({});
    fetchAssets();
  };

  return (
    <BackgroundWrapper>
      <Navbar />

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-10">
          Asset Management
        </h1>

        {/* ADD ASSET */}
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10">
          <h2 className="text-lg font-medium text-gray-800 mb-6">
            Add New Asset
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              placeholder="Asset name"
              className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
              required
            />
            <input
              name="assetType"
              value={formData.assetType}
              onChange={handleChange}
              placeholder="Asset type"
              className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
              required
            />
            <input
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              placeholder="Serial number"
              className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
              required
            />

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-2 w-full"
            >
              <option value="working">Working</option>
              <option value="damaged">Damaged</option>
            </select>

            <button className="md:col-span-2 bg-gray-900 text-white py-2 rounded-xl hover:bg-gray-800 transition w-full">
              Add Asset
            </button>
          </form>
        </div>

        {/* ASSET LIST */}
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <div
              key={asset._id}
              className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col"
            >
              {editingId === asset._id ? (
                <div className="grid gap-3">
                  <input
                    className="border rounded-lg px-3 py-2 w-full"
                    value={editData.assetName || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, assetName: e.target.value })
                    }
                  />
                  <input
                    className="border rounded-lg px-3 py-2 w-full"
                    value={editData.assetType || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, assetType: e.target.value })
                    }
                  />
                  <input
                    className="border rounded-lg px-3 py-2 w-full"
                    value={editData.serialNumber || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, serialNumber: e.target.value })
                    }
                  />
                  <select
                    className="border rounded-lg px-3 py-2 w-full"
                    value={editData.condition || "working"}
                    onChange={(e) =>
                      setEditData({ ...editData, condition: e.target.value })
                    }
                  >
                    <option value="working">Working</option>
                    <option value="damaged">Damaged</option>
                  </select>

                  <button
                    onClick={() => updateAsset(asset._id)}
                    className="bg-emerald-600 text-white py-2 rounded-lg w-full"
                  >
                    Save changes
                  </button>
                </div>
              ) : (
                <>
                  {/* HEADER */}
                  <div>
                    <h2 className="text-base font-semibold text-gray-800 truncate">
                      {asset.assetName}
                    </h2>
                    <p className="text-sm text-gray-500">{asset.assetType}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      SN: {asset.serialNumber}
                    </p>
                  </div>

                  {/* BADGES */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        asset.condition === "working"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {asset.condition}
                    </span>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        asset.condition === "damaged"
                          ? "bg-gray-200 text-gray-600"
                          : asset.status === "assigned"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {asset.condition === "damaged" ? "unavailable" : asset.status}
                    </span>
                  </div>

                  {/* ASSIGN SECTION */}
                  <div className="mt-4">
                    {asset.status === "available" && asset.condition === "working" ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          placeholder="Assign to"
                          className="border rounded-lg px-3 py-2 w-full text-sm"
                          value={assignInput[asset._id] || ""}
                          onChange={(e) =>
                            setAssignInput({
                              ...assignInput,
                              [asset._id]: e.target.value,
                            })
                          }
                        />
                        <button
                          onClick={() => assignAsset(asset._id)}
                          className="bg-gray-900 text-white px-4 rounded-lg text-sm w-full sm:w-auto"
                        >
                          Assign
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 mt-1">
                        Assigned to: <span className="font-medium">{asset.assignedTo || "—"}</span>
                      </p>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between items-center mt-auto pt-4 text-sm">
                    <button
                      onClick={() =>
                        setEditData({
                          assetName: asset.assetName,
                          assetType: asset.assetType,
                          serialNumber: asset.serialNumber,
                          condition: asset.condition,
                        }) & setEditingId(asset._id)
                      }
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAsset(asset._id)}
                      className="text-rose-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </BackgroundWrapper>
  );
}

export default Assets;
