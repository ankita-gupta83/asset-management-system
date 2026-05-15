// Employees.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch employees from backend
  useEffect(() => {
    fetch("https://asset-management-backend-kpqm.onrender.com/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Failed to fetch employees:", err));
  }, []);

  const goToEmp = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/employees");
    }}

  

  return (
    <div className="p-4">
      <h2 onClick={goToEmp}
       className="text-2xl font-bold mb-6 cursor-pointer">Employee List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map(emp => (
          <div
            key={emp.employeeId}
            onClick={() => navigate(`/employees/${emp.employeeId}`)}
            className="p-4 shadow rounded-lg bg-white cursor-pointer hover:shadow-lg transition duration-200"
          >
            <h3 className="text-lg font-semibold mb-1">{emp.name}</h3>
            <p className="text-gray-600 mb-1">ID: {emp.employeeId}</p>
            <p className="text-gray-600 mb-2">Department: {emp.department}</p>
            <p className="text-sm font-medium text-blue-600">
              Assigned Assets: {emp.assignedAssets.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employees;
