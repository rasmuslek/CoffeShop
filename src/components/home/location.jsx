import Icon from '../shared/icon.jsx';

export default function Location({ location, onSettings }) {
  return (
    <header className="location-header">
      <div className="Upper-container">
        <div className="Location">
          <p className="mb-2 text-xs text-muted">Location</p>
          <button
            className="flex items-center gap-2 text-sm"
            onClick={onSettings}
            aria-label="Change location"
          >
            {location}
            <Icon name="down" size={16} className="text-muted" />
          </button>
        </div>
        <button
          className="settings-button icon-button"
          onClick={onSettings}
          aria-label="Location and coffee preferences"
        >
          <img className="settings-image" src="/media/settings.svg" alt="" />
        </button>
      </div>
    </header>
  );
}
