import { NavLink } from 'react-router-dom';
import Icon from './icon.jsx';

export default function BottomNav({ cartCount }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {[
        ['/home', 'home', 'Home'],
        ['/search', 'search', 'Search'],
        ['/order', 'bag', 'Shopping bag'],
      ].map(([to, icon, label]) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `nav-item ${isActive ? 'nav-item-active' : ''}`
          }
          aria-label={label}
        >
          {({ isActive }) => (
            <>
              <Icon
                name={icon}
                size={25}
                filled={icon === 'home' && isActive}
              />
              <span className="nav-label">
                {icon === 'bag' ? 'Bag' : label}
              </span>
              {icon === 'bag' && cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
