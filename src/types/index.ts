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
