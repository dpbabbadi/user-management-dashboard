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

# User Management Dashboard (Tacnique FrontEnd Assignment)

A responsive **User Management Dashboard** built with **React (Vite)** that allows administrators to **view, search, filter, sort, paginate, add, edit, and delete** user records using the **JSONPlaceholder `/users`** endpoint.

---

## Live Demo
- Deployed URL: https://user-management-dashboard-iowr95ucc-dpbabbadis-projects.vercel.app 

## Repository
- GitHub Repo: https://github.com/dpbabbadi/user-management-dashboard

## Screen Recording (3–5 mins)
- Recording Link: **<PASTE YOUR LOOM / DRIVE / YOUTUBE LINK HERE>**

## Intro Recording (Tacnique)
- Recorded via: https://interviews.tacnique.com/async-interview/0c2a488c-d009-40a1-a90c-ca0d7fff5289/invite

---

## Objective
Develop a simple web application where users can **view, add, edit, and delete** user details from a **mock backend API** (JSONPlaceholder).

---

## Features (Requirement Coverage)

### User Interface
- **User Table**: Displays **ID, First Name, Last Name, Email, Department**
- **Add / Edit / Delete** actions
  - Add/Edit via modal form
  - Delete includes confirmation dialog
- **Search**: Real-time search across first name, last name, and email
- **Sort**: Clickable column headers for ascending/descending sorting
- **Filter Popup**: Filter by first name, last name, email, and department
- **Pagination**: Page sizes **10, 25, 50, 100** with page navigation controls
- **Responsive UI**: Works across mobile/tablet/desktop (table supports horizontal scroll on small screens)

### Backend Interaction
- **Base API**: https://jsonplaceholder.typicode.com/users
- Uses these HTTP verbs:
  - `GET` to fetch users
  - `POST` to add a user
  - `PUT` to update a user
  - `DELETE` to remove a user

### Error Handling & Validations
- Friendly error message shown for network/API issues
- Client-side validation for:
  - Required fields
  - Valid email format

---

## Tech Stack
- **React** (Vite)
- **JavaScript (ES6+)**
- **Axios**
- **HTML5 / CSS3**

---

## Project Structure
src/
api/
userService.js         # Axios API calls (GET/POST/PUT/DELETE)
hooks/
useUsers.js            # Data fetching + local state CRUD logic
utils/
constants.js           # API url, page sizes, departments
helpers.js             # Mapping/splitting name, department assignment
validators.js          # Form validation logic
components/
Header.jsx
SearchBar.jsx
FilterPopup.jsx
UserTable.jsx
UserRow.jsx
UserForm.jsx
ConfirmDelete.jsx
Pagination.jsx
styles/
app.css
table.css
modal.css
App.jsx
main.jsx

---

## Setup & Run Locally

### Prerequisites
- Node.js **18+**
- npm

### Install
​
npm install
npm install axios

### Run (Development)
​
npm run dev
Then open the URL shown in terminal (usually http://localhost:5173).

### Build (Production)
​
npm run build
npm run preview

---

## How to Use
1. On load, the app fetches users from JSONPlaceholder and renders them in a table.
2. Use:
   - Search bar to quickly find users
   - Filters popup for multi-field filtering
   - Column headers for sorting (asc/desc)
   - Pagination controls to navigate
3. Add user → fill form → submit
4. Edit user → open edit modal → update fields → save
5. Delete user → confirm deletion

---

## Assumptions / Notes (Important)
JSONPlaceholder is a **mock API** and does **not permanently persist** changes.

- **Add (POST):** API returns a simulated success response. The app updates **local UI state** to show the new user.
- **Edit (PUT):** JSONPlaceholder may reject PUT or not persist changes. The app uses **local UI updates** so editing works in the interface (even if the API does not persist it).
- **Delete (DELETE):** API simulates deletion. The app removes the user from **local UI state**.

### Data Mapping Assumptions
- JSONPlaceholder provides a single `name` field; the app derives:
  - `firstName` = first word of `name`
  - `lastName` = remaining words of `name`
- JSONPlaceholder does not provide `department`; the app assigns a default department during mapping.

---

## Challenges Faced
- **Mock API persistence limitation**: JSONPlaceholder does not store changes permanently, so local state handling was required to keep the UI consistent during a session.
- Ensuring sorting/filtering/search/pagination work together correctly.

---

## Improvements (If given more time)
- Persist changes across refresh using `localStorage` or a real backend (Node/Express + DB)
- Add unit tests (validation, sorting, filtering, pagination)
- Improve accessibility (keyboard navigation, ARIA labels, focus management in modals)
- Add loading skeletons and better empty states

---

## Deployment (Vercel)
- Build command: `npm run build`
- Output directory: `dist`
- The live production URL is listed at the top of this README.
​
Also do this quick code alignment (so README matches your app):
In src/utils/constants.js, set:
export const PAGE_SIZES = [10, 25, 50, 100];
​



