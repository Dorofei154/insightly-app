# Insightly App

**Insightly App** is a React-based application designed to provide users with insightful information about their daily activity and mood. The goal of the dashboard is to go beyond simple data display and deliver meaningful analysis and interactivity that helps users better understand their mood patterns and accomplishments.

## Run Instructions

Access the application using the following link:  
[Insightly App](https://darling-melomakarona-a3d09b.netlify.app/)

## For local launch

- clone the project
- run command `npm install`
- run command `npm run dev`
- open localhost link

## Key Features and Improvements

- **Component Logic Refactor**:  
  Moved the logic of components into custom hooks to improve reusability and separation of concerns.

- **Global Structure for Interfaces and Enums**:  
  Reusable or global interfaces and enums were relocated to a dedicated global folder for better organization.

- **Component-Specific Typings**:  
  Types used by components are stored near the corresponding components. Naming convention used: `name.interface/enum.ts`.

- **Performance Optimizations**:

  - Added lazy loading for modal to reduce initial load time(suspense, lazy).
  - Implemented memoization of components to prevent unnecessary re-renders (memo(HOC), useMemo, useCallback).

- **Error Handling**:  
  Introduced an Error Boundaries to handle unexpected issues gracefully.

## Technology Highlights

- **Lazy Loading**: Dynamically loading components only when needed to optimize performance.
- **Custom Hooks**: Encapsulation of component logic into reusable and testable functions.
- **TypeScript**: Ensures robust type-checking and enhanced code maintainability.
- **Memoization**: Used for optimizing rendering processes and improving user experience.
