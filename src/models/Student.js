const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true },
    fechaNacimiento: { type: Number, required: true },
    nsocio: { type: Number, required: true },
    edad: { type: Number, required: true },
    telefono: { type: Number, required: true },
    telefono2: { type: Number },
    antecedentesSalud: { type: String, required: true },
    direccion: { type: String, required: true },
    actividad: {
        type: String,
        enum: {
            values: [
                'futbol inf masc', 'futbol inf fem',
                'defensa personal',
                'folklore',
                'futsal fem', 'futsal masc',
                'volley',
                'patin',
                'zumba',
                'espacio de recreacion don orione'
            ],
            message: '{VALUE} no es un rol válido',
            default: 'patin',
            required: true
        }
    }
},
    { timestamps: true }
);


module.exports = model('Students', studentSchema);