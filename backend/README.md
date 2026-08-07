# User Authentication API

A simple MERN backend authentication service built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, **Mongoose**, **JWT**, **Zod**, and **bcryptjs**.

## Features

* User Registration
* User Login
* Authenticated Profile Retrieval
* Update Logged-in User's Name
* JWT Authentication
* Password Hashing
* Request Validation using Zod
* Request Logging Middleware
* MongoDB Integration

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* Zod

---


## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v18 or later recommended)
- npm
- MongoDB (Local installation or MongoDB Atlas)
- Git

---

## Project Structure

```
src
│
├── config
│   └── database.ts
│
├── controllers
│   └── auth.controller.ts
│
├── middleware
│   ├── auth.ts
│   ├── validate.ts
│   └── requestLogger.ts
│
├── models
│   └── User.model.ts
│
├── routes
│   └── auth.routes.ts
│
├── services
│   └── auth.service.ts
│
├── validators
│   └── auth.validator.ts
│
└── server.ts
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/JoyelSuresh/user-auth-app.git
```

Move into the project

```bash
cd backend
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-auth-db
JWT_SECRET=your_super_secret_jwt_key
```

---

## Run the Application

Development

```bash
npm run dev
```

Server

```
http://localhost:5000
```

Health Check

```
GET /health
```

---

## Authentication

Protected endpoints require a JWT.

Example Header

```
Authorization: Bearer <your_jwt_token>
```

---

## Validation

The application validates incoming requests using Zod.

Examples

Registration

* Valid email
* Password minimum 8 characters
* One uppercase letter
* One lowercase letter
* One number
* One special character

Profile Update

* Name required
* Minimum 2 characters
* Maximum 20 characters

---

## Logging

Every request is logged in the console.

Example

```
POST /auth/register - 201
POST /auth/login - 200
GET /auth/profile - 200
PATCH /auth/profile - 200
```
