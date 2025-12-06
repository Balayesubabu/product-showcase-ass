# Product Showcase & Enquiry App

A full-stack application demonstrating a responsive React UI, Node.js REST API, and SQLite database.

## Features

- **Product Listing**: View products with pagination, search, and category filtering.
- **Product Details**: Detailed view of products in a modal.
- **Enquiry System**: Submit enquiries for specific products.
- **Admin Dashboard**: View a list of submitted enquiries.
- **Responsive Design**: Works on Desktop and Mobile.
- **No-Install Database**: Uses SQLite for easy setup.

## Tech Stack

- **Frontend**: React (Vite), Vanilla CSS
- **Backend**: Node.js, Express
- **Database**: SQLite3

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup & Run Instructions

### 1. Backend Setup

Open a terminal in the root directory:

```bash
cd server
npm install
npm run seed  # Creates database and seeds detailed sample data
npm start     # Runs server on http://localhost:3000
```

### 2. Frontend Setup

Open a new terminal in the root directory:

```bash
cd client
npm install
npm run dev
```

Visit the URL shown in the terminal (usually `http://localhost:5173`) to view the app.

## Project Structure

- `client/`: React frontend application.
- `server/`: Express backend API.
- `database/`: SQL scripts and database file (`showcase.db`).

## API Endpoints

- `GET /api/products`: List products (modifiers: `page`, `limit`, `search`, `category`).
- `GET /api/products/:id`: Get product details.
- `POST /api/enquiries`: Create an enquiry.
- `GET /api/enquiries`: List enquiries (Admin).

## Decisions & Trade-offs

- **SQLite**: Chosen for simpler portability and setup (no external DB server required).
- **Vanilla CSS**: Used CSS variables and flexbox/grid for a lightweight, dependency-free styling solution without overhead of a large framework like Tailwind.
- **State Management**: Used React `useState` and `useEffect` as the state complexity is low. For a larger app, Context or Redux would be considered.
- **Pagination**: Implemented efficient server-side pagination to handle potential large datasets.

## assumptions

- Admin endpoint is public (no auth) as per the basic requirements.
- Images are served from external URLs (Unsplash) for demo purposes.
