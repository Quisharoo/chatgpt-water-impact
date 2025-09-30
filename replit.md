# ChatGPT Water Impact Analyzer

## Overview

This is a React-based web application that analyzes the water consumption impact of ChatGPT conversations. Users can upload their conversation export files (ZIP or JSON) to get insights about their ChatGPT usage's water footprint through interactive charts and comparisons.

## Recent Changes (January 27, 2025)

✓ Fixed ChatGPT conversation file parsing for standard export format
✓ Enhanced water consumption chart with dual y-axes (water + query counts)
✓ Implemented proper weekly and monthly data aggregation
✓ Improved content extraction to handle empty message parts
→ Application now successfully processes real ChatGPT conversation files

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Charts**: Chart.js for data visualization
- **Build Tool**: Vite for fast development and building

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot module reloading with Vite integration

### Project Structure
- `client/` - React frontend application
- `server/` - Express backend API
- `shared/` - Shared TypeScript types and schemas
- `migrations/` - Database migration files

## Key Components

### Data Processing
- **File Parser**: Handles JSON conversation file uploads and parsing
- **Water Calculator**: Converts conversation data to environmental metrics
- **Analytics Engine**: Processes conversation patterns and usage statistics

### User Interface
- **File Upload**: Drag-and-drop interface for conversation files
- **Dashboard**: Interactive charts showing water consumption over time
- **Statistics**: Summary cards with key metrics
- **Comparisons**: Environmental impact comparisons (showers, coffee, etc.)
- **Educational Content**: Tips for reducing AI environmental impact

### Database Schema
- **Users**: User authentication and profiles
- **Conversations**: Stored conversation analysis data with JSON metadata
- **Schema Validation**: Zod schemas for type-safe data validation

## Data Flow

1. **File Upload**: User uploads ChatGPT conversation JSON file
2. **Client-Side Processing**: File is parsed and analyzed in the browser
3. **Water Calculation**: Conversation data is converted to environmental metrics
4. **Visualization**: Results are displayed through interactive charts and statistics
5. **Data Storage**: (Optional) Analysis results can be saved to PostgreSQL database
6. **Export**: Users can export their data as CSV files

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **chart.js**: Chart visualization library
- **react-dropzone**: File upload handling

### UI Components
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette functionality

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **drizzle-kit**: Database migration management

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: Express server with TypeScript compilation via tsx
- **Database**: Neon serverless PostgreSQL database
- **Environment**: Node.js with ES modules support

### Production Build
- **Frontend**: Vite build to static assets in `dist/public`
- **Backend**: esbuild compilation to `dist/index.js`
- **Database**: Drizzle migrations applied via `drizzle-kit push`
- **Deployment**: Single Node.js process serving both API and static files

### Key Features
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Static File Serving**: Express serves Vite-built frontend in production
- **API Routes**: RESTful endpoints prefixed with `/api`
- **Error Handling**: Centralized error middleware
- **Request Logging**: Automatic API request logging with response times

The application follows a modern full-stack architecture with clear separation between client and server code, shared type definitions, and a focus on environmental awareness and user education.