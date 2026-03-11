# Changelog

## [Unreleased]
### Added
- Multi-select todo rows for bulk deletion
- Bulk delete API endpoint for removing selected todos in one request
- Component and API test coverage for bulk delete behavior
- Light and dark mode with a persisted user preference
- Theme helper utilities and test coverage for theme selection
- A more prominent light/dark mode control in the main app layout
- Updated the homepage headline to “Let's Start Today”

### Fixed
- Todo rows now use a single checkbox for selection and a separate complete/incomplete button
- Add-todo form now uses only the textbox, with Enter to submit new todos

## [0.1.0] - 2026-03-11
### Added
- Initial todo list app with create, view, toggle, and delete features
- Prisma + MySQL setup
- Jest and React Testing Library coverage for validation, components, and API routes
- Staging-ready Next.js build configuration
