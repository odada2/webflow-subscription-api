📌 Webflow Subscription API Documentation
📖 API Version: v1
📌 Status: Proof-of-Concept (PoC)
📌 Base URL: https://api.webflow-subscriptions.com/v1
1️⃣ Project Overview

This is a Proof-of-Concept Subscription API for Webflow, designed using Node.js, TypeScript, Express.js, MongoDB, and Stripe API.
✅ Key Features Implemented:

    Subscription creation, updating, cancellation, and retrieval.
    Stripe Integration for automated billing and payments.
    Webhook Processing to handle real-time payment updates.
    JWT Authentication to secure API endpoints.
    MongoDB Database for storing subscription details.
    Winston Logging for debugging and monitoring.
    TypeScript Best Practices for maintainability and scalability.

2️⃣ Quick Start Guide
📌 Prerequisites:

    Node.js v18+
    MongoDB (Local or Cloud)
    Stripe Account (for API Keys)

📌 Installation

# Clone the repository
git clone https://github.com/your-repo/webflow-subscription-api.git
cd webflow-subscription-api

# Install dependencies
npm install

# Copy environment variables
touch .env

📌 Environment Variables (.env)

PORT=4000
MONGO_URI=mongodb://localhost:27017/subscription_api
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_API_VERSION=2025-01-27.acacia
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
JWT_SECRET=your_jwt_secret_key
LOG_LEVEL=info

📌 Running the API

# Start the development server
npm run dev

# Build and run in production mode
npm run build && npm start

📌 Running Tests

# Run Jest unit tests
npm test

3️⃣ API Documentation
Method	Endpoint	Description	Authentication	File Path
POST	/api/subscriptions	Create a new subscription	✅ JWT Token	src/api/routes/subscription.routes.ts
PATCH	/api/subscriptions/:id	Upgrade/Downgrade a subscription	✅ JWT Token	src/api/routes/subscription.routes.ts
DELETE	/api/subscriptions/:id	Cancel a subscription	✅ JWT Token	src/api/routes/subscription.routes.ts
GET	/api/subscriptions/:id	Retrieve a single subscription	✅ JWT Token	src/api/routes/subscription.routes.ts
GET	/api/subscriptions	List all subscriptions (Admin-only)	✅ JWT Token (Admin)	src/api/routes/subscription.routes.ts
POST	/api/webhooks	Stripe Webhook Endpoint	❌ Public (Signature Validation)	src/api/routes/webhook.routes.ts
4️⃣ System Architecture & Code Structure
📌 Architecture Overview:

    Node.js & Express for API development.
    MongoDB for persistent subscription storage.
    Stripe API for payment processing.
    JWT Authentication for secured API access.

📌 Folder Structure Overview

├── src/
│   ├── api/                # API routes & controllers
│   ├── core/               # Business logic services
│   ├── infrastructure/     # Database, logging, and utilities
│   ├── tests/              # Unit and integration tests

📌 Key Technology Stack

    Express.js - API framework
    MongoDB - Database
    Stripe API - Payment processing
    JWT - Authentication
    Winston - Logging
    TypeScript - Static typing & maintainability

5️⃣ Logging & Monitoring
📌 Log Format

{ "timestamp": "2024-02-01T12:00:00Z", "level": "error", "message": "Database connection failed" }

📌 Debugging Tips

    Check logs in logs/combined.log & logs/error.log.
    Ensure environment variables are correctly set.

6️⃣ Contribution & Development Guidelines
📌 How to Contribute

# Clone the repo
git clone https://github.com/webflow-subscription-api.git
cd webflow-subscription-api

# Create a new feature branch
git checkout -b feature/add-webhook-validation

📌 Code Style & Linting

npm run lint

📌 Git Commit & PR Guidelines

feat(auth): Implement JWT-based authentication
fix(subscriptions): Fix webhook signature validation issue

7️⃣ Security Best Practices

    DO NOT hardcode secrets in the repo.
    Enable API rate limiting.
    Define strict CORS policies.

8️⃣ Future Enhancements & Roadmap

🚀 Planned Improvements:
1️⃣ Add Redis caching to improve API response times.
2️⃣ Implement Role-Based Access Control (RBAC) for Admins & Users.
3️⃣ Generate Postman Collection for API testing.
4️⃣ Write Jest test cases for all API endpoints.

🚀 Contributions & Issues

    If you encounter any issues or want to contribute, open a GitHub issue or submit a pull request!

📌 Last Updated: February 2025.