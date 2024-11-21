import React, { useState } from "react";
import { Role } from "../types";

const RoleManagement: React.FC = () => {
  const [roles] = useState<Role[]>([
    { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
    { id: 2, name: "User", permissions: ["read"] },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Role Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg"
          >
            <h3 className="text-lg font-medium mb-4">{role.name}</h3>
            <div>
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
    </div>
  );
};

export default RoleManagement;
