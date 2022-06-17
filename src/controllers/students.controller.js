const studentsCtrl = {};
const Students = require('../models/Student');



studentsCtrl.getStudents = async (req, res) => {
    try {
        const students = await Students.find();
        const counter = await Students.count();
        res.status(200).json({ students, counter });

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error del servidor' })
    }
};


studentsCtrl.createStudent = async (req, res) => {
    const { nombre, apellido, dni, actividad, fechaNacimiento, nsocio, telefono, antecedentesSalud } = req.body;
    const newStudent = new Students({
        nombre,
        apellido,
        dni,
        actividad,
        fechaNacimiento,
        nsocio,
        telefono,
        antecedentesSalud
    });

    try {
        await newStudent.save();
        res.status(200).json('Alumno creado')

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error al crear alumno' })
    }

};


studentsCtrl.getStudent = async (req, res) => {
    try {
        const student = await Students.findById(req.params.id);
        res.status(200).json(student)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Usuario no encontrado' })
    }
}


studentsCtrl.updateStudent = async (req, res) => {
    const { nombre, apellido, dni, actividad, fechaNacimiento, nsocio, telefono, antecedentesSalud } = req.body;

    try {
        await Students.findOneAndUpdate({ _id: req.params.id }, {
            nombre, apellido, dni, actividad, fechaNacimiento, nsocio, telefono, antecedentesSalud
        });
        res.status(200).json({ message: "Alumno actualizado" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Completar todos los datos correctamente' })
    }
}


studentsCtrl.deleteStudent = async (req, res) => {
    try {
        await Students.findByIdAndDelete(req.params.id);
        res.status(200).json("Alumno eliminado")

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error al eliminar el alumno' })
    }
}


studentsCtrl.findStudentByUsername = async (req, res) => {
    let { q = '' } = req.query;

    if (q.length === 0) {
        return res.status(400).json({
            message: 'Debe de especificar la búsqueda'
        })
    }

    try {
        const students = await Students.find({ $or: [{ apellido: q }, { nombre: q }, { actividad: q }] })
        return res.status(200).json(students);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'No se encuentran resultados para la búsqueda' })
    }
}


studentsCtrl.findStudentByActividad = async (req, res) => {
    let { q = '' } = req.query;

    if (q.length === 0) {
        return res.status(400).json({
            message: 'Debe de especificar la búsqueda'
        })
    }

    try {
        const students = await Students.find({ $or: [{ actividad: q.toLowerCase() }] })
        return res.status(200).json(students);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'No se encuentran resultados para la búsqueda' })
    }
}



module.exports = studentsCtrl;