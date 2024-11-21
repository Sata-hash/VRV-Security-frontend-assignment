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
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}
