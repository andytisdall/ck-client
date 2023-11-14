

export const navLink = ({ isActive, isPending }: {isActive: boolean, isPending: boolean}) => {
  const status = isPending
    ? 'nav-link-pending'
    : isActive
    ? 'nav-link-active'
    : '';
  return `button ${status}`;
};
