📘 BookIt: Experiences & Slots

A fullstack booking web application where users can explore experiences, view available slots, apply promo codes, and confirm bookings.
This project demonstrates real-world fullstack workflows — from API design to frontend integration — built using MERN stack.

🚀 Live Demo

Frontend (Vercel): https://your-frontend-link.vercel.app

Backend (Render): https://your-backend-link.onrender.com

🧠 Objective

To build a complete end-to-end travel experience booking system where users can:

Browse experiences.

View details, available dates, and slots.

Apply promo codes (e.g., SAVE10, FLAT100).

Complete a checkout process with confirmation.

🧩 Tech Stack
Frontend

⚛️ React (Vite)

🎨 Tailwind CSS

🔄 Axios for API calls

🌐 React Router DOM for navigation

Backend

🟢 Node.js + Express.js

🍃 MongoDB (Mongoose)

🧾 dotenv, cors, morgan for environment setup and logs

🧱 Folder Structure
bookit-experiences/
│
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── server/                 # Backend (Node + Express)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md

⚙️ Features
🌍 Frontend

Home Page: Lists all experiences fetched from backend.

Details Page: Shows experience details, available dates & time slots.

Checkout Page: Collects user info, validates promo code, and displays total.

Result Page: Shows booking confirmation or failure message.

🛠 Backend
Endpoint	Method	Description
/api/experiences	GET	Get all experiences
/api/experiences/:id	GET	Get specific experience + available slots
/api/bookings	POST	Save booking details
/api/promo/validate	POST	Validate promo code (e.g. SAVE10, FLAT100)
💡 Promo Codes
Code	Type	Description
SAVE10	Percent	10% off total price
FLAT100	Flat	₹100 off total price
🧰 Setup & Run Instructions
1️⃣ Clone Repository
git clone https://github.com/<your-username>/bookit-experiences.git
cd bookit-experiences

2️⃣ Backend Setup
cd server
npm install


Create .env file:

MONGO_URI=your_mongodb_connection_string
PORT=4000


Run backend:

npm start

3️⃣ Frontend Setup
cd ../client
npm install
npm run dev


Visit → http://localhost:3000

🔗 Integration Flow
Home → Details → Checkout → Result


✅ Dynamic data fetched from backend
✅ Promo validation integrated
✅ Booking stored in MongoDB

📱 Responsiveness

Fully responsive across all devices.

Consistent spacing, typography, and color palette.

Matches given Figma design layout.

🧾 Deliverables

Fully functional MERN stack app.

Hosted live links (Frontend + Backend).

Complete README with setup and instructions.

Promo validation and booking flow working end-to-end.