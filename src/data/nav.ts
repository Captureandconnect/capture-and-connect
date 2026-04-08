export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Results', href: '/results' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
