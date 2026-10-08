import { Link } from 'react-router-dom';
import QuantityControl from '../shared/quantity-control.jsx';
import { coffees } from '../../data/coffees.js';

export default function OrderItem({ item, onQuantityChange }) {
  const coffee = coffees.find((coffee) => coffee.id === item.coffeeId);

  return (
    <article className="order-item">
      <Link to={`/coffee/${coffee.id}`}>
        <img src={coffee.image} alt={coffee.name} />
      </Link>
      <div className="min-w-0 flex-1">
        <Link to={`/coffee/${coffee.id}`} className="order-item-name">
          {coffee.name}
        </Link>
        <p className="mt-1 text-xs text-muted">
          {coffee.subtitle}
          {item.size !== 'M' && ` · ${item.size}`}
        </p>
      </div>
      <QuantityControl
        quantity={item.quantity}
        minimum={0}
        onChange={(quantity) =>
          onQuantityChange(item.coffeeId, item.size, quantity)
        }
        label={`${coffee.name}, size ${item.size}`}
      />
    </article>
  );
}
