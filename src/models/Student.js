const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true },
    fechaNacimiento: { type: Number, required: true },
    nsocio: { type: Number, required: true },
    telefono: { type: Number, required: true },
    antecedentesSalud: { type: String, required: true },
    actividad: {
        type: String,
        enum: {
            values: ['futbol', 'hockey', 'folklore', 'futsal', 'volley', 'patin'],
            message: '{VALUE} no es un rol válido',
            default: 'futbol',
            required: true
        }
    }
},
    { timestamps: true }
);


module.exports = model('Students', studentSchema);