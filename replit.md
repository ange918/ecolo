# Ecolo - React Application

## Overview
This is a React application bootstrapped with Create React App. The project has been configured to run in the Replit environment.

## Project Structure
- `src/` - React source code
  - `App.js` - Main application component
  - `index.js` - Application entry point
  - `App.css` - Application styles
- `public/` - Public assets and HTML template
- `package.json` - Project dependencies and scripts

## Configuration
The application has been configured for Replit:
- **Port**: 5000 (required for Replit webview)
- **Host**: 0.0.0.0 (binds to all interfaces)
- **Host Check**: Disabled (allows Replit proxy to work)
- **WebSocket Port**: 0 (uses dynamic port for hot reload)

## Development
- The dev server runs on port 5000
- Hot module replacement is enabled for fast development
- The application is accessible through Replit's webview

## Deployment
The application is configured for production deployment with:
- **Build command**: `npm run build`
- **Run command**: `npx serve -s build`
- **Deployment type**: Autoscale (stateless)

## Recent Changes
- 2025-10-31: Initial Replit setup
  - Configured Create React App for port 5000
  - Disabled host checking for proxy compatibility
  - Set up workflow for automatic running
  - Installed all dependencies
  - Configured deployment with serve for production builds

## Dependencies
- React 19.2.0
- React DOM 19.2.0
- React Scripts 5.0.1
- Testing libraries (Jest, React Testing Library)
- Web Vitals for performance monitoring
