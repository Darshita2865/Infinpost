#  InfinPost – AI Powered Social Media Aggregator
# INTERNSHIP TASK :
InfinPost is an AI-powered web application that aggregates posts from multiple social media platforms such as Instagram, LinkedIn, and Facebook into one place. It helps users search, discover, and analyze content using AI and ML.

---
LIVE DEMO:
https://infinpost-frontend1.onrender.com/

#  Features

-  Search posts across multiple social media platforms
-  AI-powered search recommendations
-  User Authentication (Login & Register)
-  User Profile Management
-  Search Results Page
-  Responsive Modern UI
-  Protected Routes
-  Fast React + Vite frontend
-  Backend API Integration

---

#  Tech Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- React Icons
- CSS3

## Backend
- FastAPI
- Python
- PostgreSQL
- SQLAlchemy
- JWT Authentication

## AI / ML
- Sentence Transformers
- Hugging Face Transformers
- Scikit-Learn
- FAISS (Vector Search)

---

#  Project Structure

```
InfinPost/
│
├── backend/
│ ├── app/
│ │ ├── init.py
│ │ ├── main.py # FastAPI entry point
│ │ ├── config.py # Configuration settings
│ │ ├── database.py # Database connection
│ │ │
│ │ ├── models/ # Database models
│ │ │ ├── init.py
│ │ │ ├── user.py # User model
│ │ │ ├── post.py # Post model
│ │ │ └── search.py # Search history model
│ │ │
│ │ ├── schemas/ # Pydantic schemas
│ │ │ ├── init.py
│ │ │ ├── user.py # User schemas
│ │ │ └── post.py # Post schemas
│ │ │
│ │ ├── routes/ # API routes
│ │ │ ├── init.py
│ │ │ ├── auth.py # Authentication routes
│ │ │ ├── search.py # Search routes
│ │ │ ├── profile.py # Profile routes
│ │ │ └── posts.py # Posts routes
│ │ │
│ │ ├── services/ # Business logic
│ │ │ ├── init.py
│ │ │ ├── auth_service.py # Auth service
│ │ │ └── search_service.py # Search service
│ │ │
│ │ └── utils/ # Utility functions
│ │ ├── init.py
│ │ ├── jwt_handler.py # JWT utilities
│ │ ├── password_handler.py # Password utilities
│ │ ├── data_loader.py # Dataset loader
│ │ ├── similarity.py # Similarity calculation
│ │ └── preprocessing.py # Text preprocessing
│ │
│ ├── datasets/ # CSV datasets
│ │ ├── facebook_post.csv
│ │ ├── instagram_post.csv
│ │ ├── linkedin_post.csv
│ │ └── merged_post.csv
│ │
│ ├── venv/ # Python virtual environment
│ ├── .env # Environment variables
│ ├── requirements.txt # Python dependencies
│ ├── run.py # Server runner
│ └── infinpost.db # SQLite database
│
├── frontend/
│ ├── public/
│ │ ├── favicon.svg
│ │ └── icons.svg
│ │
│ ├── src/
│ │ ├── assets/
│ │ │ └── images/
│ │ │ ├── logo.png
│ │ │ └── hero.png
│ │ │
│ │ ├── components/
│ │ │ ├── Navbar/
│ │ │ │ ├── Navbar.jsx
│ │ │ │ └── Navbar.css
│ │ │ │
│ │ │ ├── SearchBar/
│ │ │ │ ├── SearchBar.jsx
│ │ │ │ └── SearchBar.css
│ │ │ │
│ │ │ ├── TrendingSearches/
│ │ │ │ ├── TrendingSearches.jsx
│ │ │ │ └── TrendingSearches.css
│ │ │ │
│ │ │ ├── ThemeToggle/
│ │ │ │ ├── ThemeToggle.jsx
│ │ │ │ └── ThemeToggle.css
│ │ │ │
│ │ │ ├── Loader/
│ │ │ │ ├── Loader.jsx
│ │ │ │ └── Loader.css
│ │ │ │
│ │ │ ├── PrivateRoute/
│ │ │ │ └── PrivateRoute.jsx
│ │ │ │
│ │ │ └── Footer/
│ │ │ ├── Footer.jsx
│ │ │ └── Footer.css
│ │ │
│ │ ├── contexts/
│ │ │ ├── AuthContext.jsx # Authentication context
│ │ │ └── ThemeContext.jsx # Theme context
│ │ │
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── Home.css
│ │ │ ├── About.jsx
│ │ │ ├── About.css
│ │ │ ├── Login.jsx
│ │ │ ├── Login.css
│ │ │ ├── Register.jsx
│ │ │ ├── Register.css
│ │ │ ├── Profile.jsx
│ │ │ ├── Profile.css
│ │ │ ├── Results.jsx
│ │ │ ├── Results.css
│ │ │ └── NotFound.jsx
│ │ │
│ │ ├── services/
│ │ │ └── api.js # API service layer
│ │ │
│ │ ├── styles/
│ │ │ ├── global.css
│ │ │ ├── animations.css
│ │ │ └── variables.css
│ │ │
│ │ ├── hooks/
│ │ │ └── useTheme.js # Theme hook
│ │ │
│ │ ├── utils/
│ │ │ ├── constants.js
│ │ │ ├── formatDate.js
│ │ │ └── helpers.js
│ │ │
│ │ ├── App.jsx # Main App component
│ │ ├── App.css
│ │ ├── main.jsx # Entry point
│ │ └── index.css
│ │
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── package.json
│ ├── package-lock.json
│ ├── README.md
│ └── vite.config.js
│
├── docs/ # Documentation
│ ├── API_Documentation.md
│ ├── Screenshots.md
│ └── architecture.png
│
├── screenshot/ # Screenshots
│ ├── home.png
│ ├── result.png
│ ├── search.png
│ └── darkmode.png
│
├── .gitignore
└── README.md # This file
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## User

```
GET /api/profile

PUT /api/profile
```

## Search

```
POST /api/search
```

---

# Screens

- Home
- About
- Login
- Register
- Profile
- Search Results
- 404 Page

---

# Future Enhancements

- AI Chat Assistant
- Semantic Search
- RAG Integration
- Personalized Recommendations
- Saved Searches
- Search History
- Dark Mode
- Social Media Analytics
- Image Search
- Real-Time Trending Topics

---

# Contributors

**Darshita Gondaliya**

Computer Engineering Student

AI & Machine Learning Enthusiast

---

# License

This project is my internship task based project 

---

# Built With Using

- React
- Vite
- FastAPI
- PostgreSQL
- Python
- Hugging Face
- FAISS
- Axios
- React Router
- CSS3

---

## Demo

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8000
```

---

## Author

**Darshita Gondaliya**

⭐ If you like this project, consider giving it a star on GitHub.
