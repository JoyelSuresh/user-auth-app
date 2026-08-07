# API Documentation

## Base URL

```text
http://localhost:5000
```

---

## Authentication

Protected endpoints require a valid JSON Web Token (JWT).

Include the JWT in the request header:

```http
Authorization: Bearer <your_jwt_token>
```

---

# API Endpoints


## 1. Health Check

### Endpoint

```http
GET /health
```

### Success Response (200 OK)

```json
{
  "status": "ok"
}
```

---


## 2. Register User

### Endpoint

```http
POST /auth/register
```

### Description

Registers a new user and returns the user details along with a JWT token.

### Request Body

```json
{
  "email": "demo@test.com",
  "password": "Qwerty@123",
  "name": "demo user"
}
```

### Validation Rules

| Field | Validation |
|-------|------------|
| name | Required, 2–50 characters |
| email | Must be a valid email address |
| password | Minimum 8 characters, one uppercase letter, one lowercase letter, one number, and one special character |

### Success Response (201 Created)

```json
{
    "success": true,
    "data": {
        "user": {
            "email": "demo@test.com",
            "name": "demo user",
            "_id": "6a75f253aa8fdbaaff65f29d",
            "createdAt": "2026-08-07T14:57:23.940Z",
            "updatedAt": "2026-08-07T14:57:23.940Z",
            "__v": 0
        },
        "token": "<jwt_token>"
    }
}
```

### Error Responses

#### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": [
      "Invalid input: expected string, received undefined"
    ],
    "email": [
      "Invalid input: expected string, received undefined"
    ],
    "password": [
      "Invalid input: expected string, received undefined"
    ]
  }
}
```

#### 409 Conflict

```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

## 3. Login User

### Endpoint

```http
POST /auth/login
```

### Description

Authenticates a user and returns a JWT token.

### Request Body

```json
{
  "email": "demo@test.com",
  "password": "Qwerty@123"
}
```

### Success Response (200 OK)

```json
{
    "success": true,
    "data": {
        "user": {
            "_id": "6a75f253aa8fdbaaff65f29d",
            "email": "demo@test.com",
            "name": "demo user",
            "createdAt": "2026-08-07T14:57:23.940Z",
            "updatedAt": "2026-08-07T14:57:23.940Z",
            "__v": 0
        },
        "token": "<jwt_token>"
    }
}
```

### Error Response

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 4. Get Logged-in User Profile

### Endpoint

```http
GET /auth/profile
```

### Description

Retrieves the authenticated user's profile.

### Authentication

Required

### Request Header

```http
Authorization: Bearer <jwt_token>
```

### Success Response (200 OK)

```json
{
    "success": true,
    "data": {
        "_id": "6a74e3c6ce26e6f091a61761",
        "email": "demo@test.com",
        "name": "demo user",
        "createdAt": "2026-08-06T19:43:02.492Z",
        "updatedAt": "2026-08-06T19:43:02.492Z",
        "__v": 0
    }
}
```

### Error Response

#### 401 Unauthorized

```json
{
    "success": false,
    "message": "Invalid or expired token"
}
```

---

## 5. Update Logged-in User Name

### Endpoint

```http
PATCH /auth/profile
```

### Description

Updates the authenticated user's name.

### Authentication

Required

### Request Header

```http
Authorization: Bearer <jwt_token>
```

### Request Body

```json
{
  "name": "New Demo User"
}
```

### Validation Rules

| Field | Validation |
|-------|------------|
| name | Required, 2–50 characters |

### Success Response (200 OK)

```json
{
    "success": true,
    "data": {
        "_id": "6a75f253aa8fdbaaff65f29d",
        "email": "demo@test.com",
        "name": "New Demo User",
        "createdAt": "2026-08-07T14:57:23.940Z",
        "updatedAt": "2026-08-07T15:05:11.442Z",
        "__v": 0
    }
}
```

### Error Response

#### 401 Unauthorized

```json
{
    "success": false,
    "message": "Invalid or expired token"
}
```

---


# HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict (Email Already Exists) |
| 500 | Internal Server Error |

---

# Authentication Flow

1. Register a new user using `POST /auth/register`.
2. Login using `POST /auth/login`.
3. Receive a JWT token in the response.
4. Include the JWT in the `Authorization` header for protected endpoints.
5. Access the profile using `GET /auth/profile`.
6. Update the profile name using `PATCH /auth/profile`.