import { memo, useCallback, useEffect, useRef, useState } from "react";
import { getEmployees } from "../utils";

const Employee = memo(
  ({ first_name, department, age, last_name, id, handleDelete }) => {
    return (
      <tr>
        <td>{first_name + " " + (last_name ? last_name : "")}</td>
        <td>{department ? department : "---"}</td>
        <td>{age ? age : "---"}</td>
        <td>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </td>
      </tr>
    );
  }
);

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [inputText, setInputText] = useState("");
  let initialData = useRef([]);

  const transformData = employeeData.map((employee) => {
    return {
      ...employee,
      name: `${employee.first_name} ${employee.last_name}`
    };
  });

  const employeeFilteredData = transformData.filter((item) => {
    return Object.keys(item)
      .filter((id) => id !== "id")
      .some((key) => {
        let value = item[key];
        return String(value).toLowerCase().includes(inputText.toLowerCase());
      });
  });

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployeeData(data);
      initialData.current = data;
    });
  }, []);

  const handleDelete = useCallback(
    (id) => {
      const updatedEmployee = employeeData.filter((item) => item.id !== id);
      setEmployeeData(updatedEmployee);
    },
    [employeeData]
  );
  const handleReset = () => {
    setEmployeeData(initialData.current);
  };

  return (
    <div className="container">
      <div className="searchBar">
        <input
          placeholder="Search Name"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <button onClick={() => handleReset()}>Reset</button>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeFilteredData.map((employee) => {
            return (
              <Employee
                key={employee.id}
                {...employee}
                handleDelete={handleDelete}
              />
            );
          })}
        </tbody>
      </table>

      {inputText.length > 0 && employeeData.length === 0 ? (
        <p>Query Not found</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Employees;
