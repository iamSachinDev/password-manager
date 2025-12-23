# Password Manager API

A secure, NestJS-based Password Manager API.

## Description

This project provides a backend API for a password manager, featuring:
- Secure user authentication
- Encrypted vault storage
- Audit logging
- Health checks
- Security best practices (Helmet, etc.)

## Prerequisites

- Node.js (v18+)
- MongoDB

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

### Health Check
- **endpoint**: `/health`
- **method**: `GET`
- **response**:
  ```json
  {
    "status": "ok",
    "info": {},
    "error": {},
    "details": {}
  }
  ```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Security

This application uses `helmet` for security headers and follows best practices for secure password storage using `argon2`.
