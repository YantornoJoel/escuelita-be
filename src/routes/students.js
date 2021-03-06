const { Router } = require('express');
const router = Router();

const { getStudents,
    createStudent,
    getStudent,
    deleteStudent,
    updateStudent,
    findStudentByUsername,
    findStudentByActividad,
    createStudentByExcel,
    deleteTotalStudent
} = require('../controllers/students.controller');

router.route('/')
    .get(getStudents)
    .post(createStudent)
    .delete(deleteTotalStudent)

router.route('/:id')
    .get(getStudent)
    .delete(deleteStudent)
    .put(updateStudent);

router.route('/find')
    .post(findStudentByUsername);

router.route('/find/actividad')
    .post(findStudentByActividad);

router.route('/seed')
    .post(createStudentByExcel);

module.exports = router;