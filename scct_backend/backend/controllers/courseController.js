const Course = require('../models/Course');

const addCourse = async (req, res, next) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({ success: true, message: 'Course added successfully!' });
    } catch (error) {
        next(error);
    }
};

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        next(error);
    }
};
const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
        res.status(200).json({ success: true, data: course });
    } catch (error) { next(error); }
};

const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await Course.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Course not found' });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Course.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Course not found' });
        res.status(200).json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { addCourse, getAllCourses, updateCourse, deleteCourse,getCourseById };