<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://www.mongodb.com/" target="_blank"><img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
</p>

<p align="center">A secure, progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

---

## 🛡️ Password Manager API

A robust and secure backend API designed for password management operations. Built with security-first principles using NestJS.

### ✨ Features

- **🔐 Secure Authentication**: Robust user auth flow.
- **🛡️ Encrypted Vault**: AES-256 standard encryption for stored credentials.
- **📝 Audit Logging**: Comprehensive tracking of all user actions.
- **❤️ Health Checks**: Integrated system and database health monitoring.
- **🔒 Enhanced Security**: Helmet integration, Argon2 hashing, and strict validation.

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Security**: [Helmet](https://helmetjs.github.io/), [Argon2](https://github.com/ranisalt/node-argon2)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18+)
- **MongoDB** instance (Local or Atlas)

### Installation

```bash
$ npm install
```

### Running the Application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🧪 Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📚 API Documentation

### Health Check
- **Endpoint**: `/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "ok",
    "info": {},
    "error": {},
    "details": {}
  }
  ```

## 🔐 Security

This application adheres to industry best practices:
- **Headers**: Configured with `helmet` for HTTP security headers.
- **Hashing**: Passwords hashed using `argon2`.
- **Validation**: Strict input validation using `zod`.

## 🤝 Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 📄 License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
