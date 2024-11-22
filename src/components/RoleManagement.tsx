import React, { useState, useEffect } from "react";
import { Role } from "../types";
import { api } from "../services/api";
import RoleModal from "./RoleModal";

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<
    Omit<Role, "id"> & { id?: string }
  >({
    name: "",
    permissions: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await api.getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentRole({ name: "", permissions: [] });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (role: Role) => {
    setCurrentRole(role);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing && currentRole.id) {
        const updatedRole = await api.updateRole(currentRole.id, currentRole);
        setRoles(
          roles.map((role) =>
            role.id === currentRole.id ? updatedRole : role,
          ),
        );
      } else {
        const newRole = await api.createRole(currentRole);
        setRoles([...roles, newRole]);
      }
      setShowModal(false);
      setCurrentRole({ name: "", permissions: [] });
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  const deleteRole = async (id: string) => {
    try {
      await api.deleteRole(id);
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleRoleNameChange = (name: string) => {
    setCurrentRole({ ...currentRole, name });
  };

  const togglePermission = (permission: string) => {
    setCurrentRole({
      ...currentRole,
      permissions: currentRole.permissions.includes(permission)
        ? currentRole.permissions.filter((p) => p !== permission)
        : [...currentRole.permissions, permission],
    });
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Role Management</h2>
        <button
          onClick={handleAddNew}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{role.name}</h3>
              <div>
                <button
                  onClick={() => handleEdit(role)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRole(role.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Permissions:
              </h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <RoleModal
        showModal={showModal}
        role={currentRole}
        isEditing={isEditing}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        onRoleChange={handleRoleNameChange}
        onPermissionToggle={togglePermission}
      />
    </div>
  );
};

export default RoleManagement;
