const studentsCtrl = {};
const Students = require('../models/Student');

const XLSX = require('xlsx')

let LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');


const leerExcel = (ruta) => {
    const excel = XLSX.readFile(ruta)
    const excelHojas = excel.SheetNames
    const hoja = excelHojas[0]
    const dataExcel = XLSX.utils.sheet_to_json(excel.Sheets[hoja])
    return dataExcel
}

studentsCtrl.createStudentByExcel = async (req, res) => {
    try {

        const excel = leerExcel('Usuarios-DefensaPersonal.xlsx')

        const newStudents = excel.map((e) => {
            const newStudent = new Students({
                nombre: e.nombre,
                apellido: e.apellido,
                dni: e.dni,
                actividad: e.actividad,
                fechaNacimiento: e.fechaNacimiento,
                edad: e.edad,
                nsocio: 0,
                telefono: e.telefono,
                telefono2: e.telefono2 ? e.telefono2 : '0',
                direccion: e.direccion,
                antecedentesSalud: e.antecedentesSalud
            })
            newStudent.save();
        })

        try {
            // await newStudents.save();
            res.status(200).json('Alumnos subidos')

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Error al subir alumnos' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json("Error al enviar los datos")
    }
}

studentsCtrl.getStudents = async (req, res) => {
    if (localStorage.getItem('token')) {
        try {
            const students = await Students.find();
            const counter = await Students.count();
            res.status(200).json({ students, counter });

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Error del servidor' })
        }
    } else {
        res.status(500).json({ message: "Debe estar autenticado" })
    }

};


studentsCtrl.createStudent = async (req, res) => {
    if (localStorage.getItem('token')) {
        const { nombre, apellido, dni, edad, fechaNacimiento, telefono, telefono2, direccion, antecedentesSalud, actividad } = req.body;
        const newStudent = new Students({
            nombre,
            apellido,
            dni,
            actividad,
            fechaNacimiento,
            edad,
            nsocio: 0,
            telefono,
            telefono2: telefono2 ? telefono2 : '0',
            direccion,
            antecedentesSalud
        });

        try {
            await newStudent.save();
            res.status(200).json('Alumno creado')

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Error al crear alumno' })
        }
    } else {
        res.status(500).json({ message: "Debe estar autenticado" })
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
    const { nombre, apellido, dni, edad, fechaNacimiento, telefono, telefono2, direccion, antecedentesSalud, actividad } = req.body;

    try {
        await Students.findOneAndUpdate({ _id: req.params.id }, {
            nombre, apellido, dni, edad, fechaNacimiento, telefono, telefono2, direccion, antecedentesSalud, actividad
            // nombre, apellido, dni, actividad, fechaNacimiento, nsocio: 0, telefono, antecedentesSalud, edad, telefono2, direccion
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


studentsCtrl.deleteTotalStudent = async (req, res) => {
    try {
        await Students.deleteMany({ nsocio: 0 })
        res.status(200).json("Alumnos eliminados")

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error al eliminar el alumno' })
    }
}


studentsCtrl.findStudentByUsername = async (req, res) => {
    let { q = '' } = req.query;

    if (q.length === 0) {
        return res.status(400).json({
            message: 'Debe de especificar la b??squeda'
        })
    }

    try {
        // const students = await Students.find({ $or: [{ apellido: q }, { nombre: q }, { actividad: q }] })
        const students = await Students.find({ 'nombre': { $regex: new RegExp("^" + q, 'i') } })
        const counter = students.length;

        if (students.length === 0) {
            const students = await Students.find({ 'apellido': { $regex: new RegExp("^" + q, 'i') }, })
            const counter = students.length;

            if (students.length === 0) {
                const students = await Students.find({ 'actividad': { $regex: new RegExp("^" + q, 'i') } })
                const counter = students.length;
                return res.status(200).json({ students, counter });
            }

            return res.status(200).json({ students, counter });

        }
        return res.status(200).json({ students, counter });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'No se encuentran resultados para la b??squeda' })
    }
}


studentsCtrl.findStudentByActividad = async (req, res) => {
    let { q = '' } = req.query;

    if (q.length === 0) {
        return res.status(400).json({
            message: 'Debe de especificar la b??squeda'
        })
    }

    try {
        const students = await Students.find({ $or: [{ actividad: q.toLowerCase() }] })
        return res.status(200).json(students);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'No se encuentran resultados para la b??squeda' })
    }
}



module.exports = studentsCtrl;