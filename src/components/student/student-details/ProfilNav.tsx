import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Route {
  path: string;
  label: string;
  icon: string;
}

interface ProfilNavProps {
  routes: Route[];
}

const ProfilNav: React.FC<ProfilNavProps> = ({ routes }) => {
  const location = useLocation();

  return (
    <ul className="nav nav-tabs nav-tabs-bottom mb-4">
      {routes.map((route, index) => (
        <li key={index}>
          <Link
            to={route.path}
            className={`nav-link ${location.pathname === route.path ? 'active' : ''}`}
          >
            <i className={`ti ${route.icon} me-2`} />
            {route.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProfilNav;
