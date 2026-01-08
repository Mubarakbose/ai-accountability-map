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

### Prerequisites

- **Docker Desktop** (v20.10+) - [Download here](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (v1.29+) - Usually included with Docker Desktop
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

### Quick Start with Docker (Recommended)

#### 1. **Clone or Download the Repository**

Using Git:
```bash
git clone https://github.com/Mubarakbose/ai-accountability-map.git
cd ai-accountability-map
```

Or download as ZIP and extract it.

#### 2. **Configure Environment Variables**

Copy the environment template files:

```bash
# For backend
cp backend/.env.example backend/.env.docker

# For frontend (optional, if needed)
cp frontend/.env.example frontend/.env.local
```

No changes needed if you're using default settings. Adjust values in `backend/.env.docker` if needed.

#### 3. **Build and Run with Docker Compose**

```bash
# Build all services
docker compose build

# Start all services
docker compose up -d
```

Or use a single command:
```bash
docker compose up -d --build
```

#### 4. **Access the Application**

- **Frontend (Web UI):** http://localhost
- **Backend API Docs:** http://localhost/api/docs
- **API Alternative Docs:** http://localhost/api/redoc

#### 5. **Stop the Application**

```bash
docker compose down
```

### Service Overview

| Service | Port | Description |
|---------|------|-------------|
| **Frontend** | 80 | React web application (Nginx) |
| **Backend** | (internal) | FastAPI server |
| **Database** | 5432 | PostgreSQL database |
| **API Endpoint** | /api | Backend API with proxy |

### Viewing Logs

```bash
# View all services logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

### Database Access (Optional)

If you need to access the database directly:

```bash
# Using PostgreSQL client installed locally
psql -h localhost -p 8080 -U aimap_user -d ai_accountability

# Or through Docker
docker exec -it aiacc-db psql -U aimap_user -d ai_accountability
```

**Default credentials:**
- Username: `aimap_user`
- Password: `root`
- Database: `ai_accountability`

### Stopping and Cleaning Up

```bash
# Stop all services
docker compose down

# Remove all data (including database volume)
docker compose down -v

# Rebuild images from scratch
docker compose build --no-cache
```

### Development Mode (Optional)

To run locally without Docker for development:

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/create_tables.py  # Initialize database
uvicorn app.main:app --reload
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

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
