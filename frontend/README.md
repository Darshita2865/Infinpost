InfinPost – AI Powered Social Media Aggregator
InfinPost is an AI-powered web application that aggregates posts from multiple social media platforms such as Instagram, LinkedIn, and Facebook into one place. It helps users search, discover, and analyze content using Artificial Intelligence and Machine Learning.

Features
Search posts across multiple social media platforms
AI-powered search recommendations
User Authentication (Login & Register)
User Profile Management
Search Results Page
Responsive Modern UI
Protected Routes
Fast React + Vite frontend
Backend API Integration
Tech Stack
Frontend
React.js
Vite
React Router DOM
Axios
React Icons
CSS3
Backend
FastAPI
Python
PostgreSQL
SQLAlchemy
JWT Authentication
AI / ML
Sentence Transformers
Hugging Face Transformers
Scikit-Learn
FAISS (Vector Search)
Project Structure
InfinPost/
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── database/
│   └── main.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Loader/
│   │   ├── SearchBar/
│   │   ├── TrendingSearches/
│   │   └── PrivateRoute/
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Results.jsx
│   │   └── NotFound.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── README.md
Frontend Setup
cd frontend

npm install

npm run dev
Frontend runs at:

http://localhost:5173
Backend Setup
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
Backend runs at:

http://localhost:8000
API Endpoints
Authentication
POST /api/auth/register

POST /api/auth/login
User
GET /api/profile

PUT /api/profile
Search
POST /api/search
Screens
Home
About
Login
Register
Profile
Search Results
404 Page
Future Enhancements
AI Chat Assistant
Semantic Search
RAG Integration
Personalized Recommendations
Saved Searches
Search History
Dark Mode
Social Media Analytics
Image Search
Real-Time Trending Topics
Contributors
Darshita Gondaliya

Computer Engineering Student

AI & Machine Learning Enthusiast

License
This project is my internship task

Built With Using
React
Vite
FastAPI
PostgreSQL
Python
Hugging Face
FAISS
Axios
React Router
CSS3
Author
Darshita Gondaliya

⭐ If you like this project, consider giving it a star on GitHub.