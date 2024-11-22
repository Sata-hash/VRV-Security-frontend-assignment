export interface MenuItems {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}
