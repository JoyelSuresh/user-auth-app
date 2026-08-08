# User Authentication Frontend

A React frontend for the user authentication app, built with **React**, **Vite**, and **React Router**.

## Features

* User Registration with client-side validation
* User Login
* JWT token storage in `localStorage`
* Protected routes for authenticated pages
* Dashboard with profile details
* Edit logged-in user's name
* Password show / hide toggle
* Logout


---

## Tech Stack

* React
* Vite
* React Router DOM
* Fetch API
* CSS

---


## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v18 or later recommended)
- npm
- Git
- Backend API running (see `backend/README.md`)

---

## Project Structure

```
src
│
├── api
│   └── auth.js
│
├── components
│   ├── Navbar.jsx
│   ├── PasswordToggleButton.jsx
│   └── ProtectedRoute.jsx
│
├── pages
│   ├── Dashboard.jsx
│   ├── EditProfile.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── utils
│   └── validateRegister.js
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/JoyelSuresh/user-auth-app.git
```

Move into the project

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the `frontend` folder.

Example:

```
VITE_API_URL=http://localhost:5000
```

---

## Run the Application

Development

```bash
npm run dev
```

App

```
http://localhost:5173
```

---

## Authentication

After login, the JWT is stored in `localStorage` as `token`.

Protected API calls use:

```
Authorization: Bearer <your_jwt_token>
```

---

## Validation

Registration is validated on the client before the API request.

Registration

* Name: 2–20 characters
* Valid email
* Password minimum 8 characters
* One uppercase letter
* One lowercase letter
* One number
* One special character
