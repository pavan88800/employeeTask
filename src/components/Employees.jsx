import { useEffect, useState } from "react";
import { getEmployees } from "../utils";

const Employee = ({
  first_name,
  department,
  age,
  last_name,
  id,
  handleDelete
}) => {
  return (
    <tbody>
      <tr>
        <td>{first_name + " " + (last_name ? last_name : "")}</td>
        <td>{department ? department : "---"}</td>
        <td>{age ? age : "---"}</td>
        <td>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </td>
      </tr>
    </tbody>
  );
};
const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState(employeeData);
  useEffect(() => {
    const searchQueryResult = employeeData.filter((item) => {
      const name = item.first_name + " " + item.last_name;
      const department = item.department ? item.department : "";
      return (
        name.toLowerCase().includes(inputText.toLowerCase()) ||
        department.toLowerCase().includes(inputText.toLowerCase())
      );
    });
    setSearchQuery(searchQueryResult);
  }, [inputText, employeeData]);

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployeeData(data);
      setSearchQuery(data);
    });
  }, []);

  function handleDelete(id) {
    const updatedEmployee = employeeData.filter((item) => item.id !== id);
    setEmployeeData(updatedEmployee);
  }

  function handleReset() {
    getEmployees().then((data) => {
      setEmployeeData(data);
    });
  }
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

        {searchQuery.map((employee) => {
          return (
            <Employee
              key={employee.id}
              {...employee}
              handleDelete={handleDelete}
            />
          );
        })}
      </table>

      {inputText.length > 0 && searchQuery.length === 0 ? (
        <p>Query Not found</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Employees;
