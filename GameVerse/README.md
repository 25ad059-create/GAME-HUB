# GameVerse – A Modern PC Gaming Website

## Project Overview
GameVerse is a fully static e-commerce storefront for PC games. It was designed as a student project focused on prompt engineering, demonstrating how a well-structured prompt can produce a clean, usable product with organized code, thoughtful features, and realistic user flows.

The project uses HTML, CSS, and vanilla JavaScript only. It includes a dark gaming aesthetic, neon-purple highlights, responsive layouts, a searchable catalog, cart management, and a simulated checkout experience.

## Project Goals
- Build a modern gaming storefront without using React, Node.js, or build tools.
- Showcase how clear prompt instructions can produce a usable web project.
- Practice front-end planning, modular file organization, and browser-based state management.
- Demonstrate real e-commerce UX concepts in a static environment.

## File Structure
- `index.html` – Homepage with hero section and featured games
- `products.html` – Catalog page with search, filters, and sorting
- `product.html` – Product detail page for a selected game
- `cart.html` – Shopping cart page with quantity controls and totals
- `checkout.html` – Checkout form and simulated order confirmation
- `css/style.css` – Main dark-themed storefront styling
- `data/games.js` – Sample PC game catalog data with 8 titles
- `js/store.js` – Shared cart and formatting utilities
- `js/home.js` – Homepage featured game rendering
- `js/catalog.js` – Catalog filtering, searching, and sorting logic
- `js/product.js` – Product detail rendering logic
- `js/cart.js` – Shopping cart behavior and updates
- `js/checkout.js` – Form validation and simulated order confirmation

## Features Included
- Responsive dark gaming UI with neon-purple branding
- Homepage hero section and featured game cards
- Search bar, category filtering, and sorting on catalog page
- Product detail page with system requirements
- Cart persistence via `localStorage`
- Quantity adjustment and item removal
- Checkout form validation without processing real payments
- Simulated order confirmation message

## How to Run the Project
1. Open the project folder in VS Code or any file explorer.
2. Double-click `index.html` to open it in a browser.
3. Navigate between pages using the top navigation bar.
4. Test search, category filters, cart updates, and checkout validation.

## Prompt Engineering Connection
This project is a practical example of prompt engineering because it shows how structured instructions lead to a coherent, usable web application. A strong prompt ensures:
- clear page requirements and layout structure
- organized file and naming conventions
- consistent UI behavior and user experience
- reusable logic for shared functions such as cart management
- clean front-end patterns that are easy to explain and present

## Recommended Presentation Points
- Explain the structure of the project as a small e-commerce storefront.
- Mention that the site uses plain HTML, CSS, and JavaScript to keep it lightweight and easy to understand.
- Show how search, filtering, sorting, and local cart persistence improve the browsing experience.
- Explain that checkout is simulated for safety and academic purposes.

## Notes
This project is designed for educational use and demonstration. It does not process real payments or connect to a backend service.