const Enroll = require('../models/Enroll');

const getallenroll = async (req, res, next) => {
    try {
        const allData = await Enroll.find();
        res.status(200).json({ success: true, data: allData });
    } catch (err) {
        next(err);
    }
};
const getenrollById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const found = await Enroll.findById(id);
        if (!found) {
            return res.status(404).json({ success: false, message: 'Enrollment not found' });
        }
        res.status(200).json({ success: true, data: found });
    } catch (err) {
        next(err);
    }
};

const createEnroll = async (req, res, next) => {
    try {console.log("📩 DATA RECEIVED ON BACKEND:", req.body);
        const newEnroll = new Enroll(req.body);
        await newEnroll.save();
        res.status(201).json({ success: true, message: 'Enrollment saved' });
    } catch (err) {
        next(err);
    }
};


const deleteEnroll = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Enroll.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Enrollment not found' });
        }
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getallenroll, getenrollById, createEnroll, deleteEnroll };