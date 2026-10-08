import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../shared/icon.jsx';
import Modal from '../shared/modal.jsx';
import { coffees, formatPrice } from '../../data/coffees.js';

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const searchTerm = query.trim().toLowerCase();
  const results = coffees.filter((coffee) =>
    `${coffee.name} ${coffee.subtitle} ${coffee.category}`
      .toLowerCase()
      .includes(searchTerm)
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Find your coffee"
      className="search-modal"
    >
      <div className="search-field">
        <Icon name="search" size={21} />
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search coffee"
          aria-label="Search coffee"
        />
      </div>
      <p className="search-results-label" role="status">
        {searchTerm
          ? `${results.length} ${results.length === 1 ? 'coffee' : 'coffees'} found`
          : 'Find your next favourite'}
      </p>
      <div className="search-results">
        {results.map((coffee) => (
          <Link
            key={coffee.id}
            to={`/coffee/${coffee.id}`}
            className="search-result"
          >
            <img src={coffee.image} alt="" />
            <span className="flex-1">
              <span className="block text-sm">{coffee.name}</span>
              <span className="mt-1 block text-xs text-muted">
                {coffee.subtitle}
              </span>
            </span>
            <span className="text-sm text-accent">
              {formatPrice(coffee.price)}
            </span>
            <Icon name="chevron" size={16} />
          </Link>
        ))}
        {results.length === 0 && (
          <div className="search-empty">
            <Icon name="search" size={28} />
            <p>No coffee found.</p>
            <p className="text-xs text-muted">
              Try a different name, like latte or mocha.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
