const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        
        if (admin && (await admin.matchPassword(password))) {
            res.json({
                success: true,
                _id: admin._id,
                email: admin.email,
                token: generateToken(admin._id)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};


const getAdminProfile = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin._id).select('-password');
        res.json({ success: true, admin });
    } catch (error) {
        next(error);
    }
};


module.exports = { loginAdmin, getAdminProfile };