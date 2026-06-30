const Contact = require('../models/Contact');

const sendEmail = require('../utils/sendEmail');
 const submitContact = async (req, res, next) => {
    try {
        const newMessage = new Contact(req.body);
        await newMessage.save();

        await sendEmail({
            email: req.body.email,
            subject: 'We received your message – SCCT',
            message: `Dear ${req.body.name},\n\nThank you for contacting SCCT. We will get back to you within 24 hours.\n\nRegards,\nSCCT Support`
        });

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Contact not found' });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Contact.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Contact not found' });
        res.status(200).json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitContact, getAllContacts, updateContact, deleteContact };