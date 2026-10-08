import { Link } from 'react-router-dom';
import Icon from '../shared/icon.jsx';
import { formatPrice } from '../../data/coffees.js';

export default function CoffeeCard({ coffee, onAdd }) {
  return (
    <article className="coffee-card">
      <Link
        to={`/coffee/${coffee.id}`}
        className="block"
        aria-label={`View ${coffee.name}`}
      >
        <div className="coffee-card-image">
          <img src={coffee.image} alt={coffee.name} loading="lazy" />
          <span className="rating-badge">
            <Icon name="star" size={12} filled className="text-star" />
            {coffee.rating}
          </span>
        </div>
        <h2 className="coffee-card-title">{coffee.name}</h2>
        <p className="mt-1 text-xs text-muted">{coffee.subtitle}</p>
      </Link>
      <div className="mt-2 flex items-center justify-between gap-1">
        <span className="coffee-card-price">{formatPrice(coffee.price)}</span>
        <button
          className="add-coffee"
          onClick={() => onAdd(coffee.id, 'M', 1)}
          aria-label={`Add ${coffee.name} to bag`}
        >
          <Icon name="plus" size={20} />
        </button>
      </div>
    </article>
  );
}
