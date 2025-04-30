# 💸 Khorocha

**Khorocha** (খরচা) is a personal finance tracker that helps users record, visualize, and (eventually) predict their daily, monthly, and yearly expenses and earnings. Designed using a clean, scalable architecture, Khorocha showcases modern frontend, backend, database, and deployment practices — ideal for full-stack engineering demonstration and real-world use.

---

## 🧩 Monorepo Structure

This repository follows a **monorepo pattern** with isolated, technology-specific folders:

```
khorocha/
├── client/          # React + TypeScript frontend
├── api/             # ASP.NET Core Web API backend (C#)
├── db/              # SQL Server schema and seed scripts
├── README.md
└── .gitignore
```

---

## 🚀 Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Frontend   | React, TypeScript, Vite, Chakra UI, React Query, Axios |
| Backend    | ASP.NET Core Web API (C#), Entity Framework Core       |
| Database   | SQL Server                                             |
| Dev Tools  | Docker (planned), Postman, GitHub Actions (planned)    |
| Deployment | AWS (EC2 or ECS - planned)                             |

---

## ✨ Features

- ✅ User authentication (JWT-based)
- ✅ Add, edit, delete income and expenses
- ✅ Daily / Monthly / Yearly summaries
- ✅ Dashboard with charts and filtering
- 🚧 Forecasting future expenses/earnings _(planned)_
- 🚧 OAuth login with Google/Facebook _(planned)_
- 🚧 Budgeting and overspend alerts _(planned)_

---

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mmhossain/khorocha.git
cd khorocha
```

### 2. Setup the Frontend (`client/`)

```bash
cd client
npm install
npm run dev
```

Frontend starts at: http://localhost:5173

### 3. Setup the Backend API (`api/`)

```bash
cd api/Khorocha.Api
dotnet restore
dotnet run
```

Backend API starts at: http://localhost:5000

### 4. Setup the Database (`db/`)

- Run `schema.sql` and `seed.sql` on your local SQL Server instance.

Example using `sqlcmd`:

```bash
sqlcmd -S localhost -d KhorochaDB -i ../db/schema.sql
sqlcmd -S localhost -d KhorochaDB -i ../db/seed.sql
```

---

## 🔁 Folder Breakdown

### `/client`

- Vite-powered React frontend
- Chakra UI with abstracted UI layer (easily swappable with MUI/Bootstrap)
- React Query for efficient data fetching and caching
- Domain-based folder structure (`auth`, `transaction`, `dashboard`, etc.)

### `/api`

- Clean, scalable ASP.NET Core Web API
- Domain-Driven structure (Controllers, Services, DTOs, Models)
- JWT-based authentication
- EF Core-based persistence layer
- Modular service-first architecture

### `/db`

- `schema.sql`: Creates tables like `Users`, `Transactions`, etc.
- `seed.sql`: Inserts sample data for development/testing

---

## 📊 Planned Architecture Enhancements

- Dockerized containers for local dev and deployment
- CI/CD pipeline with GitHub Actions
- Microservices support (e.g., Forecasting service)
- Caching layer (Redis)
- Global error handling and validation

---

## 🧠 Project Vision

Khorocha will evolve into a smart financial assistant that not only tracks income and expenses but also **predicts trends**, **suggests budgets**, and helps users take **informed financial decisions** using data science techniques and ML models (e.g., linear regression, time series).

---

## 🧪 Testing (Planned)

- Frontend: React Testing Library + Vitest
- Backend: xUnit + Moq
- Integration tests for major flows
- Postman Collection for API testing

---

## 📜 License

MIT License © 2025 [Mosharaf Hossain]

---

## 📫 Contact

For feedback, questions, or collaboration opportunities:

- [LinkedIn](https://www.linkedin.com/in/mosharafhossain)
- [GitHub](https://github.com/mmhossain)
