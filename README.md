BlogSphere-Hub 🚀

Welcome to BlogSphere-Hub, a modern blogging platform integrating a sleek frontend with a robust backend. This project is perfect for learning full-stack development or enhancing your portfolio with real-world features. 🌟

Project Overview 📋

Purpose: A full-stack web app for creating, managing, and displaying blogs with user authentication and responsive design.
Tech Stack: HTML, Tailwind CSS, JavaScript, Vite, Node.js, Express.js, MongoDB (via Mongoose), ESLint, Git.

Features ✅

✅ User registration and login system for secure access.
✅ CRUD operations (Create, Read, Update, Delete) for blog posts.
✅ Responsive design powered by Tailwind CSS for all devices.



📌 Admin dashboard (planned for future updates).
Getting Started 🛠️
Prerequisites 🔧

Node.js (v14 or higher) - Required to run JavaScript runtime and npm packages.
npm or yarn - Package managers for installing dependencies.



MongoDB - Database for storing user and blog data (local or cloud instance)
Installation 📥
Clone the repository:
git clone https://github.com/DevSars24/BlogSphere-Hub.git
Navigate to the project directory:

cd BlogSphere-Hub

Install backend dependencies:
cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install



Set up environment variables:
Create a .env file in the backend folder.

Add your MongoDB URI and port:
MONGODB_URI=your_mongodb_connection_string
PORT=3000

Start the backend server:

cd backend
npm start



Start the frontend development server:

cd ../frontend
npm run dev

Project Structure 🗂️

backend, frontend, README.md, .gitignore
backend: Contains server-side logic, routes, models, and views for the application.
middlewares: Middleware functions for request handling.
models: Mongoose schemas (e.g., blogModel.js, userModel.js) for database structure
public/stylesheets: CSS files for server-rendered views.
routes: API endpoints (e.g., index.js, users.js).
views: EJS templates for server-side rendering.
app.js: Main Express application file.
frontend: Houses client-side code with Vite and Tailwind CSS.
public: Static assets like index.html.
src: Source files including eslint.config.js, tailwind.config.js, and vite.config.js.



README.md: This file, providing project documentation.



.gitignore: Specifies files/folders to exclude from Git.

Usage 🎯
Access the app at http://localhost:5173 after starting both servers.
Register or log in to create and manage your blogs.
Future updates will include admin features for enhanced control.

Contributing 🤝

Fork this repository and make improvements.
Submit pull requests with your changes.

Report issues or suggestions via GitHub Issues for collaboration.

License 📜
This project is open-source under the MIT License. See LICENSE.md for details.

Author 👨‍💻

Saurabh Singh Rajput
Self-Taught Programmer & Coder

