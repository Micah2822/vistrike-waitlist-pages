# TACTIQ Spar - Replit Configuration

## Overview

TACTIQ Spar is a premium boxing sparring clip analyzer powered by AI. The application allows users to upload boxing/sparring video clips and receive instant visual insights including fighter tracking, punch metrics, and performance analytics. It's built as a React single-page application with a Vite build system, designed to be deployed as a static site with an optional backend API.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with Vite 7 as the build tool
- **Routing**: React Router DOM v7 for client-side navigation
- **Styling**: Custom CSS with CSS variables for theming (dark theme with accent colors)
- **Component Structure**: 
  - Pages located in `src/pages/` (Upload, About, Privacy)
  - Reusable components in `src/components/` (Header, Newsletter, Processing, Results)
- **Fonts**: Inter (Google Fonts) and Eurostile for branding
- **UI Components**: Configured for shadcn/ui (New York style) but components not yet fully integrated

### Build System
- **Development**: Vite dev server on port 5000 with HMR
- **Production**: Static build output to `dist/` folder
- **Server Build**: esbuild for bundling server-side code with selective dependency bundling for cold start optimization

### API Architecture
- **Proxy Setup**: Frontend proxies `/api` requests to backend at `localhost:8000`
- **Authentication**: API key passed via query parameter (from `APP_API_KEY` env variable)
- **Backend**: Express.js server (configured in `server/index.ts`, build script present)

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Located in `shared/schema.ts`
- **Migrations**: Output to `./migrations` folder
- **Connection**: Uses `DATABASE_URL` environment variable

### Analytics Integration
- **Google Analytics**: GA4 with tracking ID `G-8CYDHDXF9Q`
- **Mixpanel**: Full analytics suite with session recording enabled (100%), autocapture on, EU API endpoint

## External Dependencies

### Third-Party Services
- **Google Analytics (GA4)**: User behavior tracking and analytics
- **Mixpanel**: Product analytics with session recording capabilities

### Backend Services (configured but may need provisioning)
- **PostgreSQL Database**: Required for Drizzle ORM, connection via `DATABASE_URL`
- **External API**: Backend server expected at port 8000 for video processing

### Deployment Targets
- **Render**: Primary deployment platform documented (static site with SPA routing)
- **Replit**: Development environment with custom allowed hosts configured

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `APP_API_KEY`: API key for backend authentication

### CDN/External Resources
- Google Fonts (fonts.googleapis.com, fonts.gstatic.com)
- CDN Fonts (fonts.cdnfonts.com)
- Mixpanel CDN (cdn.mxpnl.com)
- Google Tag Manager (googletagmanager.com)