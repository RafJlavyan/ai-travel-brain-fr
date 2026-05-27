import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  className: string;
  activeClassName: string;
  children: React.ReactNode;
}

// Wrap with memo to absolutely prevent parent-driven component re-renders
export const NavLink = memo(function NavLink({
  to,
  className,
  activeClassName,
  children,
}: NavLinkProps) {
  const location = useLocation();

  // High-performance strict path matcher logic
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${className} ${isActive ? activeClassName : ""}`}
      data-discover="true"
    >
      {children}
    </Link>
  );
});
