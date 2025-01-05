import './EmployeeGroup.css';

function EmployeeGroup({ 
  id, 
  employees, 
  percentage, 
  locked,
  totalBudget, 
  onPercentageChange, 
  onEmployeesChange,
  onLockChange 
}) {
  const groupBudget = (totalBudget * (percentage / 100));
  const salaryPerEmployee = employees > 0 ? groupBudget / employees : 0;

  return (
    <div className="employee-group">
      <div className="group-header">
        <h2>Group {id}</h2>
        <label className="lock-checkbox">
          <input
            type="checkbox"
            checked={locked}
            onChange={(e) => onLockChange(id, e.target.checked)}
          />
          Lock
        </label>
      </div>
      
      <div className="input-container">
        <label>
          Number of Employees:
          <input
            type="number"
            value={employees}
            onChange={(e) => onEmployeesChange(id, Number(e.target.value))}
            min="0"
          />
        </label>
      </div>
      
      <div className="input-container">
        <label>
          Percentage: {percentage.toFixed(2)}%
          <input
            type="range"
            value={percentage}
            onChange={(e) => onPercentageChange(id, Number(e.target.value))}
            min="0"
            max="100"
            step="0.01"
            disabled={locked}
          />
        </label>
      </div>

      <div className="results">
        <p>Group Budget: ${groupBudget.toFixed(2)}</p>
        <p>Salary per Employee: ${salaryPerEmployee.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default EmployeeGroup; 