import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Icon from '../components/shared/icon.jsx';
import Modal from '../components/shared/modal.jsx';
import PageHeader from '../components/shared/page-header.jsx';

export default function Delivery({ order }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [centered, setCentered] = useState(false);

  if (order?.method === 'pickup') return <Navigate to="/pickup" replace />;

  if (!order)
    return (
      <>
        <PageHeader title="Delivery" />
        <main className="empty-state">
          <Icon name="scooter" size={48} />
          <h2>No order on the way yet</h2>
          <p>Choose your coffee to get started.</p>
          <Link className="primary-button" to="/home">
            Browse coffee
          </Link>
        </main>
      </>
    );

  return (
    <main className="delivery-page">
      <div className="delivery-map">
        {/* The map and route are a static reproduction of the supplied design. */}
        <svg
          className={`map-artwork ${centered ? 'map-centered' : ''}`}
          viewBox="0 0 375 500"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Map showing the courier's route to your delivery address"
        >
          <image
            href="/media/delivery-map.jpg"
            x="-329"
            y="0"
            width="1080"
            height="1019"
          />
          <path
            d="M82 237 97 236 95 206 120 204 120 180 240 174 252 169 252 333"
            fill="none"
            stroke="#fff"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M82 237 97 236 95 206 120 204 120 180 240 174 252 169 252 333"
            fill="none"
            stroke="#c67c4e"
            strokeWidth="4"
          />
          <g transform="translate(71 213)" fill="#c67c4e">
            <path d="M7 0a7 7 0 0 0-7 7c0 5 7 11 7 11s7-6 7-11a7 7 0 0 0-7-7Z" />
            <circle cx="7" cy="7" r="2.5" fill="#f7f7f7" />
          </g>
        </svg>

        <div className="map-controls">
          <Link to="/home" className="map-button" aria-label="Back to home">
            <Icon name="back" />
          </Link>
          <button
            className="map-button"
            onClick={() => setCentered(!centered)}
            aria-label="Center map on courier"
            aria-pressed={centered}
          >
            <Icon name="target" />
          </button>
        </div>
        <div className="courier-marker">
          <Icon name="scooter" size={22} />
        </div>
      </div>
      <section className="delivery-sheet">
        <div className="sheet-handle" aria-hidden="true" />
        <h1>10 minutes left</h1>
        <p className="delivery-destination">Delivery to {order.address.name}</p>
        <div
          className="delivery-progress"
          role="img"
          aria-label="Order progress: three of four stages complete"
        >
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="delivery-status">
          <div className="delivery-status-icon">
            <Icon name="scooter" size={30} />
          </div>
          <div>
            <h2>Your coffee is on its way</h2>
            <p>Your courier will be with you shortly.</p>
          </div>
        </div>
        <div className="courier-details">
          <img
            src="/media/courier.jpg"
            alt="Brooklyn Simmons, your personal courier"
          />
          <div>
            <h2>Brooklyn Simmons</h2>
            <p>Your courier</p>
          </div>
          <button
            className="contact-courier"
            onClick={() => setContactOpen(true)}
            aria-label="Contact your courier"
          >
            <Icon name="phone" size={26} />
          </button>
        </div>
      </section>
      <Modal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title="Contact your courier"
      >
        <p className="text-sm leading-relaxed text-muted">
          Contact details are not available yet. Please check back shortly.
        </p>
        <button
          className="primary-button mt-5"
          onClick={() => setContactOpen(false)}
        >
          Close
        </button>
      </Modal>
    </main>
  );
}
