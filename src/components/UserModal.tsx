import React from "react";
import { User } from "../types";

interface UserModalProps {
  showModal: boolean;
  newUser: Omit<User, "id">;
  onClose: () => void;
  onSave: () => void;
  onUserChange: (field: keyof Omit<User, "id">, value: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  showModal,
  newUser,
  onClose,
  onSave,
  onUserChange,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Add New User
          </h3>
          <div className="mt-2 px-7 py-3">
            <input
              type="text"
              placeholder="Name"
              className="mt-2 p-2 w-full border rounded"
              value={newUser.name}
              onChange={(e) => onUserChange("name", e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="mt-2 p-2 w-full border rounded"
              value={newUser.email}
              onChange={(e) => onUserChange("email", e.target.value)}
            />
            <select
              className="mt-2 p-2 w-full border rounded"
              value={newUser.role}
              onChange={(e) => onUserChange("role", e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Add User
            </button>
            <button
              onClick={onClose}
              className="ml-3 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
