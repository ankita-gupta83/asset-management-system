import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EmployeeDetail() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/employees`)
      .then(res => res.json())
      .then(data => {
        const emp = data.find(e => e.employeeId === employeeId);
        setEmployee(emp);
      });
  }, [employeeId]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
      <p><strong>ID:</strong> {employee.employeeId}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p className="mt-4 font-medium">Assigned Assets:</p>
      <ul className="list-disc ml-5">
        {employee.assignedAssets.length > 0 ? (
          employee.assignedAssets.map(asset => (
            <li key={asset._id}>{asset.assetName}</li>
          ))
        ) : (
          <li>No assets assigned</li>
        )}
      </ul>
    </div>
  );
}

export default EmployeeDetail;
