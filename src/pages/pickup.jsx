import { Link, Navigate } from 'react-router-dom';
import PageHeader from '../components/shared/page-header.jsx';
import Icon from '../components/shared/icon.jsx';
import { coffees, formatPrice, getCoffeePrice } from '../data/coffees.js';

export default function Pickup({ order }) {
  if (order && order.method !== 'pickup')
    return <Navigate to="/delivery" replace />;

  if (!order) {
    return (
      <>
        <PageHeader title="Pick Up" />
        <main className="empty-state">
          <Icon name="cup" size={48} />
          <h2>No pickup order yet</h2>
          <p>Choose a coffee and select Pick Up at checkout.</p>
          <Link className="primary-button" to="/home">
            Browse coffee
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Pick Up" />
      <main className="pickup-content">
        <section className="pickup-confirmation">
          <div className="pickup-icon">
            <Icon name="cup" size={36} />
          </div>
          <p className="text-sm text-accent">Order confirmed</p>
          <h1>We’re making your coffee</h1>
          <p className="text-sm leading-relaxed text-muted">
            Ready to collect in about 10 minutes.
          </p>
        </section>
        <section className="pickup-location">
          <Icon name="pin" size={23} className="text-accent" />
          <div>
            <h2>Coffee Shop, Kuressaare</h2>
            <p>Collect your order at the counter.</p>
            <p>Show your order below when you arrive.</p>
          </div>
        </section>
        <section className="pickup-summary">
          <h2>Your order</h2>
          <ul>
            {order.items.map((item) => {
              const coffee = coffees.find(
                (coffee) => coffee.id === item.coffeeId
              );
              return (
                <li
                  key={`${item.coffeeId}-${item.size}`}
                  className="pickup-item"
                >
                  <img src={coffee.image} alt="" />
                  <div className="flex-1">
                    <p>{coffee.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      Size {item.size} · Quantity {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm">
                    {formatPrice(
                      getCoffeePrice(coffee, item.size) * item.quantity
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
          {order.note && (
            <div className="pickup-note">
              <h3>Order note</h3>
              <p>{order.note}</p>
            </div>
          )}
          <dl className="pickup-totals">
            <div>
              <dt>Pick Up</dt>
              <dd>Free</dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>{order.payment}</dd>
            </div>
            <div className="pickup-total">
              <dt>Total at pickup</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </section>
        <Link className="primary-button" to="/home">
          Back to home
        </Link>
      </main>
    </>
  );
}
