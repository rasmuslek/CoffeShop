const paths = {
  back: <path d="m15 5-7 7 7 7" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  down: <path d="m5 9 7 7 7-7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="7.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />,
  bag: (
    <>
      <path d="M5 7h14l2 13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1L5 7Z" />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" />
    </>
  ),
  star: (
    <path d="m12 2 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8L2.2 9.2l6.8-1L12 2Z" />
  ),
  edit: (
    <>
      <path d="m14 5 5 5M4 16l-1 5 5-1L21 7a2 2 0 0 0-5-5L4 16Z" />
      <path d="M10 3H5a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h13a3 3 0 0 0 3-3v-6" />
    </>
  ),
  note: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="4" />
      <path d="M8 7h5M8 12h8M8 17h8" />
    </>
  ),
  discount: (
    <>
      <path d="m12 2 3 2 3.5.5 1 3.5 2 4-2 3-1 3.5-3.5 1-3 2-3-2-3.5-1-1-3.5-2-3 2-4 1-3.5L9 4Z" />
      <path d="m8 16 8-8" />
      <circle cx="8" cy="8" r=".7" />
      <circle cx="16" cy="16" r=".7" />
    </>
  ),
  wallet: (
    <>
      <rect x="2" y="4" width="20" height="17" rx="4" />
      <path d="M17 10h5v6h-5a3 3 0 0 1 0-6ZM6 8h8" />
      <path d="M17 13h.01" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v3m0 16v3M1 12h3m16 0h3" />
    </>
  ),
  phone: (
    <>
      <path d="m5 3 4 5-2 3a16 16 0 0 0 6 6l3-2 5 4-2 3C11 23 1 13 2 5Z" />
      <path d="M14 3a8 8 0 0 1 7 7m-7-3a4 4 0 0 1 3 3" />
    </>
  ),
  scooter: (
    <>
      <circle cx="6" cy="19" r="3" />
      <circle cx="19" cy="19" r="3" />
      <path d="M6 19h9l3-11h-3M3 15h8l-2-5H5M15 19l-4-9M11 10l3-3 3 2" />
      <circle cx="14" cy="3" r="1.5" />
      <path d="M1 8h5v5H1Z" />
    </>
  ),
  cup: (
    <>
      <path d="M4 8h13v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM17 9h2a3 3 0 0 1 0 6h-2M7 2v3m5-3v3" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
};

export default function Icon({
  name,
  size = 24,
  className = '',
  filled = false,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
