import { useState } from 'react';
import EmployeeGroup from './components/EmployeeGroup';
import './App.css';

function App() {
  const [totalBudget, setTotalBudget] = useState(0);
  const [groups, setGroups] = useState([
    { id: 1, employees: 0, percentage: 33.33, locked: false },
    { id: 2, employees: 0, percentage: 33.33, locked: false },
    { id: 3, employees: 0, percentage: 33.34, locked: false },
  ]);

  const handlePercentageChange = (groupId, newPercentage) => {
    // First check if the new percentage would exceed 100%
    const currentGroup = groups.find(g => g.id === groupId);
    const otherGroups = groups.filter(g => g.id !== groupId);
    const lockedGroups = otherGroups.filter(g => g.locked);
    const lockedPercentage = lockedGroups.reduce((sum, g) => sum + g.percentage, 0);

    // If new percentage plus locked percentages exceeds 100%, prevent the change
    if (lockedPercentage + newPercentage > 100) {
      return;
    }

    const percentageDiff = newPercentage - currentGroup.percentage;
    const unlockedGroups = otherGroups.filter(g => !g.locked);
    const unlockedPercentage = unlockedGroups.reduce((sum, g) => sum + g.percentage, 0);

    // If there are no unlocked groups and we're trying to increase percentage, prevent it
    if (unlockedPercentage === 0 && percentageDiff > 0) {
      return;
    }

    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return { ...group, percentage: newPercentage };
      } else if (!group.locked && unlockedPercentage > 0) {
        const ratio = group.percentage / unlockedPercentage;
        const newGroupPercentage = Math.max(0, group.percentage - (percentageDiff * ratio));
        return { ...group, percentage: newGroupPercentage };
      }
      return group;
    });

    // Verify the total is still 100% or less
    const totalPercentage = updatedGroups.reduce((sum, g) => sum + g.percentage, 0);
    if (totalPercentage <= 100) {
      setGroups(updatedGroups);
    }
  };

  const handleLockChange = (groupId, locked) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, locked } : group
    ));
  };

  const handleEmployeesChange = (groupId, employees) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, employees } : group
    ));
  };

  return (
    <div className="app">
      <h1>Salary Distribution</h1>
      <div className="budget-input">
        <label>
          Total Budget: $
          <input 
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            min="0"
          />
        </label>
      </div>
      
      <div className="groups-container">
        {groups.map(group => (
          <EmployeeGroup
            key={group.id}
            id={group.id}
            employees={group.employees}
            percentage={group.percentage}
            locked={group.locked}
            totalBudget={totalBudget}
            onPercentageChange={handlePercentageChange}
            onEmployeesChange={handleEmployeesChange}
            onLockChange={handleLockChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App; 