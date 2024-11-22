import React, { useEffect, useState } from "react";
import { Role, User } from "../types";
import { api } from "../services/api";
import UserModal from "./UserModal";
import { UserFormData } from "../schemas/userSchema";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<
    Omit<User, "id"> & { id?: string }
  >({
    name: "",
    email: "",
    role: "User",
    status: "active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await api.getRoles();
      setRoles(data);
      if (data.length > 0) {
        setCurrentUser((prev) => ({ ...prev, role: data[0].name }));
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };
  const handleAddNew = () => {
    setCurrentUser({
      name: "",
      email: "",
      role: "User",
      status: "active",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = async (formData: UserFormData) => {
    try {
      if (isEditing && currentUser.id) {
        const updatedUser = await api.updateUser(currentUser.id, formData);
        setUsers(
          users.map((user) =>
            user.id === currentUser.id ? updatedUser : user,
          ),
        );
      } else {
        const newUser = await api.createUser(formData);
        setUsers([...users, newUser]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          onClick={handleAddNew}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal
        showModal={showModal}
        user={currentUser}
        roles={roles}
        isEditing={isEditing}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserManagement;
