FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Put your code directly in /app (mirrors local layout)
COPY app /app

EXPOSE 8000
# Start exactly like you do locally
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
