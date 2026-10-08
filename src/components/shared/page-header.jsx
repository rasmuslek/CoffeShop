import { Link } from 'react-router-dom';
import Icon from './icon.jsx';

export default function PageHeader({ title, backTo = '/home', children }) {
  return (
    <header className="page-header">
      <div className="page-header-content">
        <Link to={backTo} className="icon-button" aria-label="Go back">
          <Icon name="back" />
        </Link>
        <h1 className="text-base">{title}</h1>
        <div className="header-action">{children}</div>
      </div>
    </header>
  );
}
