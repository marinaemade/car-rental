# Car Rental Application

A full-stack car rental management system with user and admin interfaces.

## Team Members
- Marina Emad
- Merna Hanna
- Rahma Samy
- Hanin Yassin
- Mina Lotfy
- Fatma Hisham

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── admin/       # Admin-specific components
│   ├── common/      # Shared components (Footer, Logo, etc.)
│   └── user/        # User-facing components
├── context/         # React Context for state management
│   └── AdminContext.jsx  # Main data management context
├── layouts/         # Page layout wrappers
│   ├── AdminLayout.jsx   # Admin panel layout
│   └── UserLayout.jsx    # User-facing layout
├── pages/           # Page components
│   ├── admin/       # Admin pages (Dashboard, Bookings, etc.)
│   ├── auth/        # Authentication pages
│   ├── user/        # User pages (Home, Cars, etc.)
│   └── notFound/    # 404 page
├── App.jsx          # Main routing configuration
└── main.jsx         # Application entry point
```

## Key Features

### User Interface
- Browse available cars
- View car details
- Make reservations
- Cart functionality
- User profile management

### Admin Interface
- Dashboard with statistics
- Booking management (CRUD operations)
- Car fleet management
- Client management
- Financial tracking (payments & expenses)

## Technology Stack

- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Material Tailwind** - UI component library
- **Heroicons** - Icon library
- **Vite** - Build tool

## Simplifications Made for Beginners

The project has been simplified to make it easier to understand and maintain:

### Removed Complex Features
- **Dashboard Charts**: Removed complex Recharts visualizations (AreaChart, PieChart) - now shows simple stat cards
- **Kanban View**: Removed drag-and-drop Kanban board from Bookings page - now uses simple table view
- **Grid View**: Removed card grid from Units page - now uses simple table view
- **Live Tracking**: Removed real-time GPS tracking page (too complex for beginners)
- **Messages**: Removed messaging system (too complex for beginners)

### Removed Unused Dependencies
- `@hello-pangea/dnd` - drag and drop library (not needed after removing Kanban)
- `axios` - HTTP client (not used, app uses localStorage)
- `heroicons` - duplicate of @heroicons/react
- `react-icons` - icon library (not used, app uses @heroicons/react)

### Simplified Configuration
- Removed custom animations from Tailwind config
- Removed empty context files (AuthContext, BookingContext, CartContext)

### Current Admin Features
- Dashboard with simple stat cards
- Bookings management (table view with CRUD)
- Fleet/Units management (table view with CRUD)
- Clients management
- Drivers management
- Financial tracking (Payments & Expenses)

## Data Management

The application uses:
- **LocalStorage** for data persistence
- **Mock JSON files** for initial data loading
- **React Context** for state management

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Beginner Notes

### How the App Works

1. **User Flow**: Users can browse cars, add them to cart, and make reservations
2. **Admin Flow**: Admins manage the entire system through the `/admin` route
3. **Data Flow**: All data is managed through `AdminContext.jsx` and persisted to localStorage

### Important Files to Understand

- `src/App.jsx` - See all available routes
- `src/context/AdminContext.jsx` - Understand data management
- `src/layouts/UserLayout.jsx` - User-facing routes
- `src/layouts/AdminLayout.jsx` - Admin routes

### Styling

The app uses Tailwind CSS with custom colors defined in `tailwind.config.js`:
- Primary green: `#22c55e`
- Dark theme colors for admin panel
- Light theme for user interface