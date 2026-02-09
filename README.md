# Fintech Dashboard API

## Project Overview

**Fintech Dashboard API** is a comprehensive backend service for a financial management dashboard that enables users to manage transactions, profiles, and media uploads. The API provides secure authentication, transaction tracking, user profile management, and multimedia upload capabilities with robust security features.

### Purpose
This API serves as the backbone for a fintech application, providing:
- User authentication and authorization with JWT tokens
- Real-time transaction management (credit/debit operations)
- Dashboard analytics and financial summaries
- User profile management with image uploads
- Media upload support for images and videos
- Role-based access control (RBAC) with admin functionality

---

## Installation Steps

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn** package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fintech-dashboard-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   JWT_EXPIRE=<token-expiration-time>
   PORT=<server-port>
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:<PORT>`

5. **Run tests**
   ```bash
   npm test
   ```

---

## Major Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest | JavaScript runtime environment |
| **Express** | ^5.2.1 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | ^9.0.0 | MongoDB object modeling |
| **JWT (jsonwebtoken)** | ^9.0.3 | Authentication & authorization |
| **Bcryptjs** | ^3.0.3 | Password hashing & encryption |
| **Multer** | ^2.0.2 | File upload handling |
| **Helmet** | ^8.1.0 | Security headers middleware |
| **CORS** | ^2.8.5 | Cross-origin resource sharing |
| **Dotenv** | ^17.2.3 | Environment variables management |
| **Express Rate Limit** | ^8.2.1 | API rate limiting |
| **Express Mongo Sanitize** | ^2.2.0 | NoSQL injection prevention |
| **XSS** | ^1.0.15 | XSS attack prevention |
| **Jest** | Latest | Testing framework |

---

## API Endpoints

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `POST` | `/signup` | Register a new user | ❌ No |
| `POST` | `/login` | Login and receive JWT token | ❌ No |

**Request Example - Signup:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Request Example - Login:**
```json
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

---

### Transaction Endpoints (`/api/transactions`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|----------------|---------------|
| `GET` | `/` | Get all user transactions | ✅ Yes | User |
| `POST` | `/` | Create a new transaction (credit/debit) | ✅ Yes | User |
| `GET` | `/:id` | Get a specific transaction by ID | ✅ Yes | User |
| `PUT` | `/:id` | Update a transaction | ✅ Yes | Admin |

**Request Example - Create Transaction:**
```json
{
  "type": "debit",
  "amount": 150.50
}
```

**Request Example - Update Transaction:**
```json
{
  "type": "credit",
  "amount": 200.00
}
```

---

### Dashboard Endpoints (`/api/dashboard`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/summary` | Get dashboard financial summary | ✅ Yes |

---

### Profile Endpoints (`/api/profile`)

| Method | Endpoint | Description | Auth Required | Content-Type |
|--------|----------|-------------|----------------|--------------|
| `POST` | `/` | Upload profile image | ✅ Yes | multipart/form-data |

**Notes:** Upload image file as `profileImage` form field

---

### Upload Endpoints (`/api/upload`)

| Method | Endpoint | Description | Auth Required | Content-Type |
|--------|----------|-------------|----------------|--------------|
| `POST` | `/upload-image` | Upload an image file | ✅ Yes | multipart/form-data |
| `POST` | `/upload-video` | Upload a video file | ✅ Yes | multipart/form-data |

**Notes:**
- Image upload uses `image` form field
- Video upload uses `video` form field
- All upload endpoints require JWT authentication

---

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcryptjs encryption for user passwords
- **Helmet** - HTTP security headers
- **Rate Limiting** - Protection against brute force attacks
- **Input Sanitization** - MongoDB injection and XSS attack prevention
- **CORS** - Controlled cross-origin requests
- **Role-Based Access Control (RBAC)** - Admin and user role separation

---

## Authentication

All protected endpoints require a valid JWT token in the request header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Testing

Run the test suite with:
```bash
npm test
```

Included test files:
- `tests/auth.test.js` - Authentication tests
- `tests/transaction.test.js` - Transaction tests
- `tests/dashboard.test.js` - Dashboard tests
- `tests/admin.test.js` - Admin functionality tests

---

## File Structure

```
fintech-dashboard-api/
├── config/           # Database configuration
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/          # Mongoose schemas
├── routes/          # API routes
├── tests/           # Test files
├── uploads/         # Upload directory
├── public/          # Frontend assets
├── app.js           # Express app setup
├── server.js        # Server entry point
└── package.json     # Dependencies
```

---

## Support & Documentation

For more information and API documentation, refer to the Swagger documentation available when the server is running or review the inline JSDoc comments in the controller files.

