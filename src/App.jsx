import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home.jsx';
import Onboarding from './pages/onboarding.jsx';
import Detail from './pages/detail.jsx';
import Order from './pages/order.jsx';
import Delivery from './pages/delivery.jsx';
import Pickup from './pages/pickup.jsx';

export default function App() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  const [favourites, setFavourites] = useState([]);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    name: 'Jl. Kpg Sutoyo',
    details: 'Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.',
  });
  const [order, setOrder] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Opening or closing search keeps the catalogue at its current position.
    const cataloguePaths = ['/home', '/search'];
    const togglingSearch =
      cataloguePaths.includes(pathname) &&
      cataloguePaths.includes(previousPath.current);
    if (!togglingSearch) window.scrollTo(0, 0);
    previousPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!notification) return;
    const timeout = window.setTimeout(() => setNotification(''), 2500);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  function toggleFavourite(coffeeId) {
    setFavourites((current) =>
      current.includes(coffeeId)
        ? current.filter((id) => id !== coffeeId)
        : [...current, coffeeId]
    );
  }

  function addToCart(coffeeId, size, quantity) {
    setCart((current) => {
      const existingItem = current.find(
        (item) => item.coffeeId === coffeeId && item.size === size
      );
      if (existingItem)
        return current.map((item) =>
          item === existingItem
            ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
            : item
        );
      return [...current, { coffeeId, size, quantity }];
    });
    setNotification('Added to your bag');
  }

  function changeQuantity(coffeeId, size, quantity) {
    setCart((current) =>
      current
        .map((item) =>
          item.coffeeId === coffeeId && item.size === size
            ? { ...item, quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function placeOrder(nextOrder) {
    setOrder(nextOrder);
    setCart([]);
    setNotification('');
  }

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const homeProps = {
    favourites,
    onAdd: addToCart,
    cartCount,
  };

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Home {...homeProps} />} />
        <Route path="/search" element={<Home {...homeProps} searchMode />} />
        <Route
          path="/coffee/:coffeeId"
          element={
            <Detail
              key={pathname}
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
              onAdd={addToCart}
            />
          }
        />
        <Route
          path="/order"
          element={
            <Order
              cart={cart}
              onQuantityChange={changeQuantity}
              address={address}
              onAddressChange={setAddress}
              onPlaceOrder={placeOrder}
            />
          }
        />
        <Route path="/delivery" element={<Delivery order={order} />} />
        <Route path="/pickup" element={<Pickup order={order} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {notification && pathname !== '/order' && (
        <div className="toast" role="status">
          {notification}
        </div>
      )}
    </div>
  );
}
