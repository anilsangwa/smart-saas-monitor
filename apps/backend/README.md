# Smart SaaS Monitor – Backend

Backend service for the **Smart SaaS Monitoring Dashboard**.  
Built with [NestJS](https://nestjs.com/), integrated with **tRPC**, **Drizzle ORM**, and **Zod** for a fully type-safe developer experience.  

## Features

- 🚀 **NestJS** – modular, scalable Node.js framework  
- 🔗 **tRPC** – end-to-end typesafe API (no schema duplication)  
- 🗄 **Drizzle ORM** – type-safe SQL queries with Postgres support  
- ✅ **Zod** – runtime validation + TypeScript inference  
- ⚡ Live `health` endpoint for quick testing  

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the project
 development
```
npm run start
```

watch mode
```
npm run start:dev
```

 production
```
npm run start:prod
```

### 3. Access the API

tRPC is exposed at:

http://localhost:4000/trpc


Try calling the default health query:

GET http://localhost:4000/trpc/health


Response:
```
{"result":{"data":"ok"}}
```

Project Structure
```
apps/backend/
├── src/
│   ├── app.module.ts        # Root NestJS module
│   ├── main.ts              # Bootstrap + tRPC middleware
│   ├── trpc/
│   │   ├── trpc.service.ts  # tRPC init + app router
│   │   └── routers/
│   │       └── app.router.ts # Example health router
│   └── ...
├── package.json
└── tsconfig.json
```

## Scripts
lint code
```
npm run lint
```

run tests
```
npm run test
npm run test:watch
npm run test:e2e
npm run test:cov
```

## Roadmap

 Extend tRPC routers for monitoring metrics

 Connect Drizzle ORM with Postgres for persistent storage

 Add authentication + authorization

 Expose monitoring-agent metrics through API

 CI/CD via GitHub Actions & Jenkins