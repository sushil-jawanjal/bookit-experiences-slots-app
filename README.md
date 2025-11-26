📘 BookIt: Experiences & Slots

A booking module for a fullstack travel application, built using the MERN stack.
This feature allows users to explore experiences, view available slots, apply promo codes, and confirm bookings.
This project demonstrates real-world fullstack workflows — from API design to frontend integration — built using MERN stack.

🧠 Objective

To build a complete end-to-end travel experience booking system where users can:

Browse experiences.

View details, available dates, and slots.

Apply promo codes (e.g., SAVE10, FLAT100).

Complete a checkout process with confirmation.

Screen Shot:<img width="1593" height="855" alt="image" src="https://github.com/user-attachments/assets/f69c3d2e-b417-4163-b911-67c97ffc7a41" />
<img width="1380" height="863" alt="image" src="https://github.com/user-attachments/assets/8f099f45-0ee7-4cbf-82ca-2af75f51d5ca" />
<img width="1463" height="864" alt="image" src="https://github.com/user-attachments/assets/891213c7-926e-437d-895a-aa057c9d83e3" />
<img width="1475" height="863" alt="image" src="https://github.com/user-attachments/assets/66dbdecb-8bba-4772-821e-4b34a56ccc1c" />



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
bookit-experiences/<br>
│<br>
├── client/                 # Frontend (React + Vite)<br>
│   ├── src/<br>
│   │   ├── assets/<br>
│   │   ├── components/<br>
│   │   ├── data/<br>
│   │   ├── pages/<br>
│   │   ├── App.jsx<br>
│   │   └── main.jsx<br>
│   ├── package.json<br>
│   ├── vite.config.js<br>
│   └── .gitignore<br>
│<br>
├── server/                 # Backend (Node + Express)<br>
│   ├── config/<br>
│   ├── controllers/<br>
│   ├── models/<br>
│   ├── routes/<br>
│   ├── .env<br>
│   ├── server.js<br>
│   └── package.json<br>
│<br>
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
npm run dev

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

Complete README with setup and instructions.

Promo validation and booking flow working end-to-end.
