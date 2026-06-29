# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# User Management Dashboard

## Overview
A React app to view, search, filter, sort, paginate, add, edit, and delete users using JSONPlaceholder.

## Tech Stack
- React (Vite)
- Axios
- CSS


## API
Base URL: https://jsonplaceholder.typicode.com/users

## Assumptions / Notes
- JSONPlaceholder is a mock API and does not persist POST/PUT/DELETE changes.
- The app updates UI using local state (optionally can persist via localStorage).
- `firstName` and `lastName` are derived by splitting the API `name`.
- `department` is assigned a default because the API does not provide one.

## Features
- User table (ID, First Name, Last Name, Email, Department)
- Search + Sort + Filter popup
- Pagination (10/25/50/100)
- Add/Edit form with validation
- Delete confirmation
- Error handling and responsive UI

## Challenges Faced
- JSONPlaceholder does not persist data; handled via local state updates.

## Improvements (If more time)
- Persist data via localStorage or real backend
- Unit tests
- Better UI/UX and accessibility