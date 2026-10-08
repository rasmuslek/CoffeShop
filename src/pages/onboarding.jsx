import { Link } from 'react-router-dom';

export default function Onboarding() {
  return (
    <main className="onboarding-page">
      <div className="onboarding-hero">
        <img
          src="/media/onboarding.jpg"
          alt="Fresh coffee splashing into a cup surrounded by roasted coffee beans"
          fetchPriority="high"
        />
      </div>
      <div className="onboarding-content">
        <h1>Coffee, made your way.</h1>
        <p>
          Choose your coffee. We’ll have it ready for pickup or bring it to you.
        </p>
        <Link className="primary-button" to="/home">
          Browse coffee
        </Link>
      </div>
    </main>
  );
}
