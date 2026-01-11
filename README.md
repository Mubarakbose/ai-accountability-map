# ⚖️ AI Accountability Map

A traceability and documentation tool for Machine Learning development pipelines. Built to align with principles from the **EU AI Act (2024)**, this platform helps teams visualize, log, and validate each development phase of an ML system using an interactive map, complete with evidence uploads and responsible actor attribution.

---

## 🔍 Preview

<img src="aiMapOverview.png" alt="Accountability Map Overview" />

---

## 📌 Key Features

- 🌐 **Interactive Accountability Map**  
  Visualize your pipeline in 3 levels:
  - **Pipeline Stages** (EU AI Act): Data Collection, Preprocessing, Development, Deployment
  - **Pipeline Methods**: Specific processes or tools used in each stage
  - **Pipeline Details**: Evidence, logs, responsible actors, metrics, images, files

- 📎 **Evidence Uploads**  
  Upload and attach:
  - `.csv` datasets or results
  - `.png/.jpg` model charts or explainability plots

- 📉 **Model Forecast Logging (Optional)**  
  Input data manually or fetch real-time weather → Predict PV output → Log performance metrics + SHAP plots into the map.

---

## 🧱 Tech Stack

| Layer          | Stack                                    |
|----------------|------------------------------------------|
| **Frontend**   | React, TypeScript, Tailwind CSS, React Flow |
| **Backend**    | FastAPI, SQLAlchemy, PostgreSQL, Pydantic |
| **ML Models**  | LSTM (trained for PV generation forecast) |
| **Explainability** | SHAP (optional integration)           |

---

## 🧾 Versions

- **Node.js:** v18+
- **Python:** 3.10+
- **FastAPI:** 0.110+
- **React:** 18+
- **PostgreSQL:** 14+

---

## 📂 Project Structure

### **Frontend**

```
frontend/
├── components/        # Nodes, Modals, Forms
├── pages/             # HomePage (Map)
├── services/          # API abstraction (Axios)
├── styles/            # TailwindCSS config
├── types/             # TypeScript interfaces
└── App.tsx
```

### **Backend**

```
backend/
├── requirements.txt   # Python dependencies
├── init-db/   # Database File (.sql) 
└── app/
    ├── main.py              # FastAPI app
    ├── database.py          # PostgreSQL setup
    ├── models/              # SQLAlchemy models
    ├── routers/             # API routes
    ├── schemas/             # Pydantic validation
    └── create_tables.py     # Schema init script
```

---

## 🧪 Local Setup (How to Run)

### ⚡ Quick Start (3 Steps)

**The fastest way to get the application running:**

```bash
# 1. Clone the repository
git clone https://github.com/Mubarakbose/ai-accountability-map.git
cd ai-accountability-map

# 2. Build and start all services (Docker automatically configures everything)
docker compose up -d --build

# 3. Open in browser
# Frontend:  http://localhost
# API Docs:  http://localhost/api/docs
```

That's it! All services will be running in the background. ✅

---

### 📋 Prerequisites

Before running the application, ensure you have installed:

- **Docker Desktop** (v20.10+) - [Download here](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (v1.29+) - Usually included with Docker Desktop
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

**Verify installation:**
```bash
docker --version
docker compose --version
```

---

### 🐳 Running with Docker (Recommended for Everyone)

Docker handles all setup automatically - no need to install Python, Node.js, or PostgreSQL!

#### **Step 1: Clone or Download the Repository**

**Option A - Using Git (Recommended):**
```bash
git clone https://github.com/Mubarakbose/ai-accountability-map.git
cd ai-accountability-map
```

**Option B - Download as ZIP:**
1. Visit https://github.com/Mubarakbose/ai-accountability-map
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open terminal in the extracted folder

#### **Step 2: Build and Run All Services**

Run this single command - it builds images and starts everything:

```bash
docker compose up -d --build
```

**What this command does:**
- ✅ Builds the backend image (FastAPI)
- ✅ Builds the frontend image (React + Nginx)
- ✅ Starts PostgreSQL database
- ✅ Initializes the database with seed data
- ✅ Runs all services in the background

**First run takes ~2-3 minutes. Subsequent runs are much faster.**

#### **Step 3: Access the Application**

Open these URLs in your browser:

| Service | URL | Purpose |
|---------|-----|---------|
| **Application** | http://localhost | Interactive accountability map UI |
| **API Documentation** | http://localhost/api/docs | Swagger UI for API testing |
| **API ReDoc** | http://localhost/api/redoc | Alternative API documentation |

All services should show as "healthy" ✅

#### **Step 4: Stop the Application**

```bash
# Stop all services (keeps data)
docker compose down

# Or remove everything including data
docker compose down -v
```

---

### 📊 Service Overview

What's running in the background:

| Service | Container | Port | Status |
|---------|-----------|------|--------|
| **Frontend** | aiacc-frontend | 80 | Nginx serving React build |
| **Backend API** | aiacc-backend | 8000 (internal) | FastAPI server |
| **Database** | aiacc-db | 5432 (internal) | PostgreSQL 15 |

Database credentials (for Docker):
- **User:** `aimap_user`
- **Password:** `root`
- **Database:** `ai_accountability`

---

### 🔍 Viewing Application Logs

To see what's happening inside the containers:

```bash
# View all services logs (live)
docker compose logs -f

# View specific service logs
docker compose logs -f backend    # See backend errors/requests
docker compose logs -f frontend   # See frontend errors
docker compose logs -f db         # See database logs

# View last 50 lines only
docker compose logs --tail=50 backend
```

---

### 🗄️ Database Access (Optional)

If you need to directly query the database:

```bash
# Access the database from command line
docker compose exec db psql -U aimap_user -d ai_accountability

# Some useful SQL commands:
# \dt - List all tables
# \d pipeline_stages - Describe a table
# SELECT * FROM pipeline_stages; - View data
```

---

### 🧹 Troubleshooting Docker

**Port 80 already in use?**
```bash
# Edit docker-compose.yml and change:
# ports: ["8080:80"]  # Then access at http://localhost:8080
```

**Want to start fresh?**
```bash
# Remove all containers and volumes
docker compose down -v

# Rebuild everything from scratch
docker compose build --no-cache
docker compose up -d --build
```

**Check if services are healthy:**
```bash
docker compose ps
# All should show STATUS: "Up X seconds (healthy)"
```

**See detailed service info:**
```bash
docker compose logs -f
```

---

### 💻 Development Mode (Optional - Without Docker)

If you prefer local development without Docker:

#### **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate          # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/create_tables.py        # Initialize database
uvicorn app.main:app --reload      # Runs on http://localhost:8000
```

#### **Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
npm start                          # Runs on http://localhost:3000
```

⚠️ **Note:** This requires Python 3.10+, Node.js 18+, and PostgreSQL running separately.

---

### 📚 More Information

For detailed information about Docker setup, see:
- **DOCKER.md** - Comprehensive Docker guide with advanced options
- **DOCKER_QUICK_REFERENCE.md** - Command reference and cheatsheet
- **.env.example** - Configuration options available

### Troubleshooting

**Port 80 is already in use:**
- Update `docker-compose.yml` to use a different port:
  ```yaml
  ports:
    - "8000:80"  # Access at http://localhost:8000
  ```

**Database connection issues:**
```bash
# Check database health
docker compose logs db

# Restart database service
docker compose restart db
```

**Build failures:**
```bash
# Clean build (remove cached layers)
docker compose build --no-cache

# Rebuild from scratch
docker system prune -a
docker compose up -d --build
```

**Permission errors on Linux:**
```bash
# Run with sudo or configure Docker daemon
sudo docker compose up -d
```
---

## 🔗 API Summary

| Endpoint                                | Description                   |
|-----------------------------------------|-------------------------------|
| `GET /pipeline_stages/`                 | List all pipeline stages      |
| `POST /pipeline_stages/`                | Create a stage                |
| `GET /pipeline_method/`                 | List all methods              |
| `POST /pipeline_method/`                | Create a method               |
| `GET /pipeline_details/by_method/{id}`  | Get details for a method      |
| `POST /pipeline_details/` (file upload) | Add detail with optional file |

---

## 🧠 Use Cases

- 🔬 Research documentation (model tracking)
- 📑 Compliance with AI regulations
- 👥 Role-based responsibility logging
- 📊 Model performance audits and explainability

---

## 📍 Next Steps (Optional Phase 2)

- SHAP explainability visual integration
- Forecasting interface (real-time + dataset)
- Auto-log metrics + input CSV
- Version control for pipeline changes

---

## 📜 License

This project is released under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you’d like to change.

---

## 🧑‍💻 Author

- **Lead Developer / Researcher:** Mubarak Ahmad B.
- **Supervisors:** Prof. Dr.-Ing. Hermann de Meer, Prof. Dr. Florian Lemmerich, Anna Volkova
---

## 📖 References

- [EU AI Act 2024](https://artificialintelligenceact.eu/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [React Flow](https://reactflow.dev/)
- [SHAP Explainability](https://github.com/slundberg/shap)

---

> This platform enables **traceability and transparency** in AI systems from the ground up — linking every decision, dataset, and result to the people and processes behind it.
