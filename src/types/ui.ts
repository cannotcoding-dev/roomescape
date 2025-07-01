export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
  action: () => void;
}

export interface ComputerApp {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  defaultSize: { width: number; height: number };
}

export interface OfficeObject {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isInteractive: boolean;
  isHighlighted?: boolean;
  onClick?: () => void;
  requirements?: string[];
  tooltip?: string;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  loop?: boolean;
}

export interface NotificationConfig {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary';
}