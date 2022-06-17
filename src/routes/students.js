const { Router } = require('express');
const router = Router();

const { getStudents,
    createStudent,
    getStudent,
    deleteStudent,
    updateStudent,
    findStudentByUsername,
    findStudentByActividad
} = require('../controllers/students.controller');

router.route('/')
    .get(getStudents)
    .post(createStudent);

router.route('/:id')
    .get(getStudent)
    .delete(deleteStudent)
    .put(updateStudent);

router.route('/find')
    .post(findStudentByUsername);

router.route('/find/actividad')
    .post(findStudentByActividad);

module.exports = router;