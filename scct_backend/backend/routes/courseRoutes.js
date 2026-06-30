const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', courseController.addCourse);
router.get('/', courseController.getAllCourses);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.get('/:id', courseController.getCourseById);
module.exports = router;

