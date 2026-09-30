# Calculator App

A simple full-stack calculator built with **Flask** (Python) on the backend and **HTML, CSS, JavaScript** on the frontend.

All calculations are handled server-side by Python — the browser sends the numbers and operator to Flask, which computes the result and sends it back.

---

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Divide-by-zero error handling
- Clean UI with button hover effects
- Full-stack architecture: frontend talks to a Python backend via a JSON API

## Project Structure

```
calculator-app/
├── Calculator.py        # Flask server and calculation logic
├── requirements.txt     # Python dependencies
├── templates/
│   └── Calculator.html  # Calculator UI
└── static/
    ├── Calculator.css   # Styling
    └── Calculator.js    # Button logic and API calls
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/calculator-app.git
   cd calculator-app
   ```

2. **Create a virtual environment and install dependencies**
   ```bash
   python -m venv venv
   source venv/bin/activate      # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Run the app**
   ```bash
   python Calculator.py
   ```

4. **Open your browser** and go to `http://127.0.0.1:5000`

## Tech Stack

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS, JavaScript (Fetch API)
