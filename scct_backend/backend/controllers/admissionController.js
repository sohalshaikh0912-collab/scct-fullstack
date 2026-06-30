const Admission = require('../models/Admission');
const sendEmail = require('../utils/sendEmail');

const submitAdmission = async (req, res, next) => {
    try {
        const newAdmission = new Admission(req.body);
        await newAdmission.save();

        
        await sendEmail({
            email: req.body.email,                  
            subject: 'Admission Received – SCCT',
            message: `Dear ${req.body.firstName},\n\nThank you for applying to SCCT! We have received your admission form and will contact you within 48 hours.\n\nBest regards,\nSCCT Admissions Team`
        });

        res.status(201).json({ success: true, message: 'Admission submitted successfully!' });
    } catch (error) {
        next(error);
    }
};


const getAdmissionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const singleData = await Admission.findById(id);
        if (!singleData) return res.status(404).json({ success: false, message: 'Admission not found' });
        res.status(200).json({ success: true, data: singleData });
    } catch (error) {
        next(error);
    }
};


const updateAdmission = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = await Admission.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedData) return res.status(404).json({ success: false, message: 'Admission not found' });
        res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        next(error);
    }
};


const deleteAdmission = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedData = await Admission.findByIdAndDelete(id);
        if (!deletedData) return res.status(404).json({ success: false, message: 'Admission not found' });
        res.status(200).json({ success: true, message: 'Admission deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const getAllAdmissions = async (req, res, next) => {
    try {
        const allData = await Admission.find().sort({ createdAt: -1 });
        res.status(200).json({ 
            success: true, 
            count: allData.length, 
            data: allData 
        });
    } catch (error) {
        next(error);
    }
};
module.exports = { submitAdmission, getAllAdmissions, getAdmissionById, updateAdmission, deleteAdmission };