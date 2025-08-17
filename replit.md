# Overview

This is a personalized children's storybook application called "YouAreTheHero" that creates custom stories where children become the protagonists. The platform focuses on Brazilian culture, specifically featuring Amazon rainforest adventures. Users can upload a child's photo, provide basic information, and generate personalized storybooks available in both digital and print formats. The application integrates with Stripe for payments and uses AI-generated content personalization.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with custom design system focused on warm, child-friendly colors
- **UI Components**: Radix UI primitives with custom shadcn/ui components for consistent design
- **State Management**: React Query (TanStack Query) for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **File Upload**: React Dropzone for client-side file handling
- **Session Management**: Express sessions with PostgreSQL session store

## Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Structured tables for stories, orders, and personalization data
- **File Storage**: File uploads handled through multipart forms

## Authentication and Authorization
- **Session-based**: Express sessions for user state management
- **No complex auth**: Simplified flow focusing on order completion rather than user accounts
- **Payment Security**: Stripe handles sensitive payment data with webhook validation

## Content Personalization System
- **Story Templates**: Pre-defined story structures with placeholder tokens
- **Dynamic Content**: Real-time text personalization using child's name and age
- **Image Integration**: Placeholder system for future AI-generated images
- **Preview System**: Immediate story preview before purchase

## Business Logic Architecture
- **Order Processing**: Multi-step workflow from personalization to payment
- **Format Options**: Digital (immediate PDF) and physical print fulfillment
- **Pricing Tiers**: Different pricing for digital vs physical products
- **Content Management**: Story templates stored in database with version control capability

# External Dependencies

## Payment Processing
- **Stripe**: Complete payment processing including payment intents, webhooks, and subscription management
- **Payment Methods**: Credit cards, digital wallets through Stripe's unified API
- **Security**: PCI compliance handled by Stripe infrastructure

## Database and Hosting
- **Neon Database**: Serverless PostgreSQL for production database hosting
- **Connection Pooling**: Built-in connection management for serverless environments

## Development and Build Tools
- **Vite**: Fast development server and optimized production builds
- **ESBuild**: High-performance JavaScript bundling for server code
- **TypeScript**: Static type checking across the entire stack

## UI and Design System
- **Google Fonts**: Poppins, Inter, Fredoka One, and Fira Code for typography variety
- **Radix UI**: Accessible component primitives for complex UI patterns
- **Lucide React**: Consistent icon system throughout the application

## File Processing
- **React Dropzone**: Drag-and-drop file upload with validation
- **Image Optimization**: Client-side image processing and validation before upload

## Development Environment
- **Replit Integration**: Special configuration for Replit development environment
- **Hot Reload**: Development server with instant updates during coding