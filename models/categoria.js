const { Schema, model } = require('mongoose');


const CategoriaSchema = Schema({
    rol: { //En caso de que no sirva el nombre rol, utilizar el de nombre
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },

    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model ('Categoria', CategoriaSchema);