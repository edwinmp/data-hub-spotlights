export interface DefaultLayoutData {
  navigation: Navigation;
}

export interface Navigation {
  primary: NavigationItem[];
  secondary: NavigationItem[];
}

interface NavigationItem {
  title: string;
  full_url: string;
  active: boolean;
  relative_url: string;
}
