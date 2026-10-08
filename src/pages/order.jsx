import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/shared/page-header.jsx';
import Icon from '../components/shared/icon.jsx';
import Modal from '../components/shared/modal.jsx';
import OrderItem from '../components/order/order-item.jsx';
import { coffees, formatPrice, getCoffeePrice } from '../data/coffees.js';

export default function Order({
  cart,
  onQuantityChange,
  address,
  onAddressChange,
  onPlaceOrder,
}) {
  const navigate = useNavigate();
  const [method, setMethod] = useState('deliver');
  const [note, setNote] = useState('');
  const [payment, setPayment] = useState('Cash/Wallet');
  const [dialog, setDialog] = useState(null);
  const isDelivery = method === 'deliver';
  const cashLabel = isDelivery ? 'Cash on delivery' : 'Cash at pickup';
  const paymentLabel = payment === 'Cash' ? cashLabel : payment;
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      getCoffeePrice(
        coffees.find((coffee) => coffee.id === item.coffeeId),
        item.size
      ) *
        item.quantity,
    0
  );
  const deliveryFee = isDelivery ? 1 : 0;
  const total = subtotal + deliveryFee;

  function placeOrder() {
    onPlaceOrder({
      method,
      address: { ...address },
      note,
      payment: paymentLabel,
      total,
      items: [...cart],
    });
    navigate(isDelivery ? '/delivery' : '/pickup');
  }

  return (
    <>
      <PageHeader title="Order" />
      {cart.length === 0 ? (
        <main className="empty-state order-empty">
          <Icon name="bag" size={48} />
          <h2>Your bag is waiting</h2>
          <p>Find a coffee you love and add it to your order.</p>
          <Link className="primary-button" to="/home">
            Explore coffee
          </Link>
        </main>
      ) : (
        <>
          <main className="order-content">
            <div className="delivery-tabs" aria-label="Order method">
              <button
                className={isDelivery ? 'is-selected' : ''}
                aria-pressed={isDelivery}
                onClick={() => setMethod('deliver')}
              >
                Deliver
              </button>
              <button
                className={!isDelivery ? 'is-selected' : ''}
                aria-pressed={!isDelivery}
                onClick={() => setMethod('pickup')}
              >
                Pick Up
              </button>
            </div>
            <section className="address-section">
              <h2>{isDelivery ? 'Delivery Address' : 'Pick Up Address'}</h2>
              <p className="address-name">
                {isDelivery ? address.name : 'Coffee Shop, Kuressaare'}
              </p>
              <p className="text-xs leading-relaxed text-muted">
                {isDelivery
                  ? address.details
                  : 'Your coffee will be waiting at our counter.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {isDelivery && (
                  <button
                    className="small-pill"
                    onClick={() => setDialog('address')}
                  >
                    <Icon name="edit" size={15} />
                    Edit Address
                  </button>
                )}
                <button
                  className="small-pill"
                  onClick={() => setDialog('note')}
                >
                  <Icon name="note" size={15} />
                  {note ? 'Edit Note' : 'Add Note'}
                </button>
              </div>
              {note && <p className="order-note">{note}</p>}
            </section>
            <section className="order-items" aria-label="Items in your order">
              {cart.map((item) => (
                <OrderItem
                  key={`${item.coffeeId}-${item.size}`}
                  item={item}
                  onQuantityChange={onQuantityChange}
                />
              ))}
            </section>

            {isDelivery && (
              <button
                className="discount-card"
                onClick={() => setDialog('discount')}
              >
                <Icon name="discount" size={22} className="text-accent" />
                <span>Delivery discount applied</span>
                <Icon name="chevron" size={21} />
              </button>
            )}
            <section className="payment-summary">
              <h2>Payment Summary</h2>
              <dl>
                <div>
                  <dt>Price</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div>
                  <dt>{isDelivery ? 'Delivery Fee' : 'Pick Up'}</dt>
                  <dd>
                    {isDelivery && <del className="mr-2">$ 2.0</del>}
                    {isDelivery ? '$ 1.0' : 'Free'}
                  </dd>
                </div>
              </dl>
            </section>
          </main>
          <footer className="order-footer bottom-panel">
            <button
              className="payment-method"
              onClick={() => setDialog('payment')}
              aria-label={`Payment method: ${paymentLabel}. Change payment method`}
            >
              <Icon name="wallet" size={23} className="text-accent" />
              <span>
                <span className="block">{paymentLabel}</span>
                <span className="mt-1 block text-sm text-accent">
                  {formatPrice(total)}
                </span>
              </span>
              <Icon name="down" size={20} className="ml-auto text-muted" />
            </button>
            <button className="primary-button" onClick={placeOrder}>
              Place order
            </button>
          </footer>
        </>
      )}

      <Modal
        open={dialog === 'address'}
        onClose={() => setDialog(null)}
        title="Edit delivery address"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const name = data.get('name').trim();
            const details = data.get('details').trim();
            if (!name || !details) return;
            onAddressChange({ name, details });
            setDialog(null);
          }}
        >
          <label className="form-label">
            Street or building
            <input
              name="name"
              required
              defaultValue={address.name}
              key={address.name}
              maxLength={80}
            />
          </label>
          <label className="form-label">
            Full address
            <textarea
              name="details"
              required
              defaultValue={address.details}
              key={address.details}
              rows={3}
              maxLength={200}
            />
          </label>
          <button className="primary-button mt-5" type="submit">
            Save address
          </button>
        </form>
      </Modal>
      <Modal
        open={dialog === 'note'}
        onClose={() => setDialog(null)}
        title={isDelivery ? 'Add a delivery note' : 'Add an order note'}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setNote(new FormData(event.currentTarget).get('note').trim());
            setDialog(null);
          }}
        >
          <label className="form-label">
            Your note
            <textarea
              name="note"
              defaultValue={note}
              key={note}
              rows={4}
              maxLength={300}
              placeholder="Anything we should know about your order?"
            />
          </label>
          <button className="primary-button mt-5" type="submit">
            Save note
          </button>
        </form>
      </Modal>
      <Modal
        open={dialog === 'discount'}
        onClose={() => setDialog(null)}
        title="Delivery discount"
      >
        <p className="text-sm leading-relaxed text-muted">
          Your delivery fee is reduced from $ 2.00 to $ 1.00. The $ 1.00 saving
          is already included in your total.
        </p>
        <button className="primary-button mt-5" onClick={() => setDialog(null)}>
          Got it
        </button>
      </Modal>
      <Modal
        open={dialog === 'payment'}
        onClose={() => setDialog(null)}
        title="Payment method"
      >
        <p className="mb-4 text-sm text-muted">
          {isDelivery
            ? 'Pay when your coffee arrives.'
            : 'Pay at the counter when you collect your coffee.'}
        </p>
        {['Cash/Wallet', 'Cash'].map((option) => (
          <button
            key={option}
            className="payment-option"
            onClick={() => {
              setPayment(option);
              setDialog(null);
            }}
          >
            {option === 'Cash' ? cashLabel : option}
            {payment === option && <Icon name="check" size={20} />}
          </button>
        ))}
      </Modal>
    </>
  );
}
