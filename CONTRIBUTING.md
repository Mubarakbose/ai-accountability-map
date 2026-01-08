# Contributing to AI Accountability Map

We welcome contributions to improve the AI Accountability Map!  
Whether it’s fixing bugs, adding new features, or improving documentation, all help is appreciated.

---

## 📜 Contribution Guidelines

### **1. Fork the Repository**
Create your own copy of this repository by clicking **"Fork"**.

### **2. Clone Your Fork**
```bash
git clone https://github.com/<your-username>/ai-accountability-map.git
cd ai-accountability-map
```

### **3. Create a Branch**
Use a descriptive branch name:
```bash
git checkout -b feature/your-feature-name
```

### **4. Make Changes**
- Ensure **code style** follows existing formatting.
- For the frontend: run `npm run lint` (if ESLint is configured).
- For the backend: format with `black` and run tests.

### **5. Commit Your Changes**
Write clear commit messages:
```bash
git commit -m "Add feature: description of your change"
```

### **6. Push and Create a Pull Request**
Push your branch and open a PR:
```bash
git push origin feature/your-feature-name
```
Then open a pull request on GitHub.

---

## 📐 Code Style

- **Frontend:** Use TypeScript, React hooks, and Tailwind CSS.
- **Backend:** Follow FastAPI conventions, use Pydantic for validation, and keep routes modular.

---

## 🧪 Testing

- **Backend:** Use `pytest` to run tests.
- **Frontend:** Use `npm test` (or your configured testing framework).

---

## 📧 Questions?

Open an issue if you’re unsure about something — we’re happy to help!
