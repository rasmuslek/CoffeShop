import Icon from './icon.jsx';

export default function QuantityControl({
  quantity,
  onChange,
  minimum = 1,
  label = 'Coffee',
}) {
  return (
    <div className="quantity-control">
      <button
        type="button"
        className="icon-button"
        aria-label={`Decrease ${label} quantity`}
        disabled={quantity <= minimum}
        onClick={() => onChange(quantity - 1)}
      >
        <Icon name="minus" size={20} />
      </button>
      <span aria-live="polite" aria-label={`${label} quantity`}>
        {quantity}
      </span>
      <button
        type="button"
        className="icon-button"
        aria-label={`Increase ${label} quantity`}
        disabled={quantity >= 99}
        onClick={() => onChange(quantity + 1)}
      >
        <Icon name="plus" size={20} />
      </button>
    </div>
  );
}
