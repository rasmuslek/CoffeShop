import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/shared/icon.jsx';
import PageHeader from '../components/shared/page-header.jsx';
import QuantityControl from '../components/shared/quantity-control.jsx';
import {
  coffees,
  formatPrice,
  getCoffeePrice,
  sizes,
} from '../data/coffees.js';

export default function Detail({ favourites, onToggleFavourite, onAdd }) {
  const { coffeeId } = useParams();
  const navigate = useNavigate();
  const coffee = coffees.find((item) => item.id === coffeeId);
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);

  if (!coffee)
    return (
      <>
        <PageHeader title="Detail" />
        <main className="empty-state">
          <h2>Coffee not found</h2>
          <Link className="primary-button" to="/home">
            Browse coffee
          </Link>
        </main>
      </>
    );

  const isFavourite = favourites.includes(coffee.id);
  const price = getCoffeePrice(coffee, size) * quantity;
  const canExpand = coffee.description.length > 160;
  const preview = coffee.description.slice(0, 160).replace(/\s+\S*$/, '');

  return (
    <>
      <PageHeader title="Detail">
        <button
          className={`icon-button ${isFavourite ? 'text-accent' : ''}`}
          onClick={() => onToggleFavourite(coffee.id)}
          aria-label={
            isFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
          aria-pressed={isFavourite}
        >
          <Icon name="heart" size={27} filled={isFavourite} />
        </button>
      </PageHeader>
      <main className="detail-content">
        <img className="detail-photo" src={coffee.image} alt={coffee.name} />
        <section className="coffee-information">
          <h2>{coffee.name}</h2>
          <p className="mt-1 text-xs text-muted">Hot or iced</p>
          <div className="detail-rating">
            <Icon name="star" size={21} filled className="text-star" />
            <span>
              {coffee.rating}{' '}
              <span className="text-xs text-muted">({coffee.reviews})</span>
            </span>
          </div>
        </section>
        <section className="description-section">
          <h3>Description</h3>
          <p>
            {expanded || !canExpand ? coffee.description : `${preview}…`}{' '}
            {canExpand && (
              <button
                className="read-more"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
        </section>
        <fieldset className="size-section">
          <legend>Size</legend>
          <div className="grid grid-cols-3 gap-4">
            {sizes.map((item) => (
              <label
                key={item}
                className={`size-option ${size === item ? 'is-selected' : ''}`}
              >
                <input
                  type="radio"
                  name="size"
                  value={item}
                  checked={size === item}
                  onChange={() => setSize(item)}
                  className="sr-only"
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
      </main>
      <footer className="detail-footer bottom-panel">
        <QuantityControl
          quantity={quantity}
          onChange={setQuantity}
          label={coffee.name}
        />
        <button
          className="primary-button"
          onClick={() => {
            onAdd(coffee.id, size, quantity);
            navigate('/home');
          }}
        >
          Add to bag<span>{formatPrice(price)}</span>
        </button>
      </footer>
    </>
  );
}
