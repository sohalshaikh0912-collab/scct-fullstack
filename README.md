🖥️ Local Setup Instructions
✅ Prerequisites
Node.js (v18+)

MongoDB (local installation) or MongoDB Atlas account

Git

1. Clone the repository
bash
git clone https://github.com/sohalshaikh0912-collab/scct-fullstack.git
cd scct-fullstack
2. Backend setup
bash
cd scct_backend
npm install
Create a .env file inside the scct_backend folder with the following content:

text
PORT=5000
MONGO_URI=mongodb://localhost:27017/scct
EMAIL_USER=sohalshaikh0912@gmail.com
EMAIL_PASS=lirk toct cmqm yhlg
JWT_SECRET=123sohal
ADMIN_EMAIL=sohal2@gmail.com
(If you use MongoDB Atlas, replace the MONGO_URI with your Atlas connection string.)

3. Seed the database with mock data (40+ leads)
bash
node seed.js
You should see: ✅ 40+ mock leads seeded successfully!

4. Create an admin user (if not already seeded)
Run this command to create the admin account:

bash
node -e "const mongoose = require('mongoose'); const bcrypt = require('bcryptjs'); require('dotenv').config(); (async () => { await mongoose.connect(process.env.MONGO_URI); const Admin = require('./models/Admin'); await Admin.deleteMany({ email: 'sohal2@gmail.com' }); const salt = await bcrypt.genSalt(10); const hash = await bcrypt.hash('admin123', salt); await Admin.create({ email: 'sohal2@gmail.com', password: hash }); console.log('✅ Admin user created: sohal2@gmail.com / admin123'); process.exit(); })();"
Admin credentials:
Email: sohal2@gmail.com
Password: admin123

5. Start the backend server
bash
node server.js
You should see:
✅ Server running on port 5000
✅ MongoDB Connected: localhost

6. Frontend setup (in a new terminal)
bash
cd ../talwinder-Css   # or go to the frontend folder
npm install
npm run dev
The frontend will start at http://localhost:5173.

7. Access the application
Public website: http://localhost:5173

Admin panel: http://localhost:5173/admin/login

Use the credentials above to log in.

8. Verify the dashboard
After logging in, you'll see:

Stats and funnel with the seeded 40+ leads.

Manage Courses (add/delete).

Manage Admissions (view statuses).

Manage Contacts (view/delete messages).

CSV export button.

📦 Project structure
text
scct-fullstack/
├── scct_backend/          # Backend (Node.js + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── seed.js
│   ├── server.js
│   └── package.json
└── talwinder-Css/         # Frontend (React + Vite)
    ├── src/
    ├── public/
    ├── package.json
    └── ...
📧 Contact
For any issues, please reach out to:
Sohal Shaikh – sohalshaikh0912ail.com

