export const navLink = ({ isActive, isPending }) => {
  const status = isPending
    ? 'nav-link-pending'
    : isActive
    ? 'nav-link-active'
    : '';
  return `button ${status}`;
};
