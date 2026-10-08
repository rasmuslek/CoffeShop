# Coffee Shop

A Vite, React, and Tailwind recreation of the five supplied coffee shop designs.
The layout follows the mobile references and stays centered at a maximum width
of 430px on larger screens.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The first screen is onboarding; select
**Browse coffee** to open the coffee catalogue.

```bash
npm run build  # Create the production site in dist/
npm run lint   # Check JavaScript and JSX
```

## Project structure

- `src/pages/`: onboarding, home, coffee detail, order, delivery, and pickup screens.
- `src/components/home/`: the location header, coffee cards, promotion, and search overlay.
- `src/components/order/`: items displayed in the shopping bag.
- `src/components/shared/`: icons, navigation, headers, dialogs, and quantity controls.
- `src/data/coffees.js`: coffee names, descriptions, categories, prices, and image paths.
- `src/App.jsx`: routes and shared shopping state, passed to pages through props.
- `src/style.css`: Tailwind theme colors and styles grouped by screen.
- `public/media/`: all app image files, including the settings SVG and original photos extracted from the supplied PDFs.

## Screens and interactions

| URL                   | Screen                                                     |
| --------------------- | ---------------------------------------------------------- |
| `/`                   | Onboarding                                                 |
| `/home`               | Coffee catalogue                                           |
| `/search`             | Centered search overlay above the catalogue                |
| `/coffee/caffe-mocha` | Coffee details, favourites, size, and quantity             |
| `/order`              | Bag, delivery/pickup, address, notes, and payment summary  |
| `/delivery`           | Delivery view after placing a demo order                   |
| `/pickup`             | Pickup confirmation, collection details, and order receipt |

Add coffee from a card or detail screen to populate the order screen. Different
sizes appear as separate items. Reducing an order item's quantity to zero removes
it. The medium Caffe Mocha and discounted delivery fee match the reference:
$4.53 + $1.00 = $5.53.

The search icon opens a centered dialog with a blurred background. Results link
to coffee details. Close it with the close button, Escape, or a click outside.
The catalogue stays in place underneath. The heart on a detail screen adds a coffee to the
Favourites category. The location and settings buttons open location and sorting
preferences.

Selecting Pick Up at checkout removes the delivery fee and opens a dedicated
pickup confirmation after ordering. It shows the collection location, estimated
preparation time, and receipt. Only delivery orders open the courier map.

## Images and design details

Replace the files in `public/media/` to use your own photos, or change their paths
in `src/data/coffees.js`. The onboarding, promotion, courier portrait, and map
use clearly named files in the same folder. No image generation or external
stock photos are used.

The Solway font used by the original workspace is retained. Solway and Montserrat
load through Google Fonts, with local serif and sans-serif fallbacks.
All interface icons are SVGs rather than emojis.

The product descriptions, extra prices, and size adjustments are sample values
for interactions not specified in the reference. Edit them in `src/data/coffees.js`.

## Demo scope

Shopping state lasts while the application is open and resets on refresh. Order
placement, payment options, courier details, and the delivery route are a frontend
demo: no payment is taken, no order is sent, and the map does not provide live GPS
tracking. A courier phone number has not been invented.

When deploying, configure the host to serve `index.html` for application routes
so direct links such as `/home` work with React Router.
