const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); 

dotenv.config();

const app = express();
connectDB();


app.use(express.json());
app.use(cors());

const enRoutes = require('./routes/enRoutes')
app.use('/api/enrolls', enRoutes);

const admissionRoutes = require('./routes/admissionRoutes');
const courseRoutes = require('./routes/courseRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.get('/', (req, res) => {
    res.send('SCCT Backend API is Running...');
});


app.use('/api/admissions', admissionRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: `404 - Route not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
    console.error("🔥 Global Error Caught:", err.stack || err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));