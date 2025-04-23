import "tailwindcss";
import "./App.css";

import { useState, useEffect } from "react";
import { Table } from "./components/Table";
import { User, TableColumn } from "./types/table";

const columns: TableColumn<User>[] = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Role", accessor: "role" },
];

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(
      "https://jsonplaceholder.typicode.com/users" // Replace with your API endpoint
    )
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (ids: string[]) => {
    setUsers((prevUsers) => prevUsers.filter((user) => !ids.includes(user.id)));
  };

  const handleEdit = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Table
          data={users}
          columns={columns}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;
