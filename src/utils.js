export async function getEmployees() {
  await new Promise((r) => setTimeout(r, 200));
  return [
    {
      id: 1,
      first_name: "Alice",
      last_name: "Johnson",
      department: "Engineering",
      age: 29
    },
    { id: 2, first_name: "Smith", last_name: null, department: null, age: 41 },
    {
      id: 3,
      first_name: "Ivy",
      last_name: "Chen",
      department: "Design",
      age: 25
    },
    {
      id: 4,
      first_name: "Dana",
      last_name: "Lee",
      department: "Sales",
      age: null
    },
    {
      id: 5,
      first_name: "Eric",
      last_name: null,
      department: "Engineering",
      age: 33
    },
    {
      id: 6,
      first_name: "Fatima",
      last_name: "Khan",
      department: null,
      age: 27
    },
    {
      id: 7,
      first_name: "Giorgio",
      last_name: "Marino",
      department: "Design",
      age: 36
    },
    {
      id: 8,
      first_name: "Hana",
      last_name: "Suzuki",
      department: "Sales",
      age: 30
    }
  ];
}
