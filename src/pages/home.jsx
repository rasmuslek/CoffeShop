import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Location from '../components/home/location.jsx';
import CoffeeCard from '../components/home/coffee-card.jsx';
import PromoBanner from '../components/home/promo-banner.jsx';
import SearchModal from '../components/home/search-modal.jsx';
import BottomNav from '../components/shared/bottom-nav.jsx';
import Icon from '../components/shared/icon.jsx';
import Modal from '../components/shared/modal.jsx';
import { categories, coffees } from '../data/coffees.js';

export default function Home({
  favourites,
  onAdd,
  cartCount,
  searchMode = false,
}) {
  const navigate = useNavigate();
  const [category, setCategory] = useState('All Coffee');
  const [location, setLocation] = useState('Kuressaare, Estonia');
  const [sort, setSort] = useState('featured');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const visibleCoffees = coffees.filter((coffee) => {
    const matchesCategory =
      category === 'All Coffee' ||
      (category === 'Favourites'
        ? favourites.includes(coffee.id)
        : coffee.category === category);
    return matchesCategory;
  });

  if (sort === 'price-low') visibleCoffees.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') visibleCoffees.sort((a, b) => b.price - a.price);

  return (
    <>
      <Location location={location} onSettings={() => setSettingsOpen(true)} />
      <main className="home-content">
        <PromoBanner />

        <div className="category-list" aria-label="Coffee categories">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-button ${category === item ? 'is-selected' : ''}`}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="coffee-grid">
          {visibleCoffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} onAdd={onAdd} />
          ))}
        </div>
        {visibleCoffees.length === 0 && (
          <div className="empty-state">
            <Icon
              name={category === 'Favourites' ? 'heart' : 'search'}
              size={36}
            />
            <h2>
              {category === 'Favourites'
                ? 'No favourites yet'
                : 'No coffee found'}
            </h2>
            <p>
              {category === 'Favourites'
                ? 'Tap the heart on a coffee’s detail page to save it for later.'
                : 'Try another name or coffee category.'}
            </p>
          </div>
        )}
      </main>
      <BottomNav cartCount={cartCount} />
      <SearchModal
        open={searchMode}
        onClose={() => navigate('/home', { replace: true })}
      />

      <Modal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Your preferences"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setLocation(data.get('location').trim() || 'Kuressaare, Estonia');
            setSort(data.get('sort'));
            setSettingsOpen(false);
          }}
        >
          <label className="form-label">
            Location
            <input
              name="location"
              required
              defaultValue={location}
              key={location}
              maxLength={50}
            />
          </label>
          <label className="form-label">
            Sort coffee
            <select name="sort" defaultValue={sort}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
          <button className="primary-button mt-5" type="submit">
            Save preferences
          </button>
        </form>
      </Modal>
    </>
  );
}
