const mongoose = require('mongoose')

const dbConnection = async() =>{

    try {

        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('Conexión a la base de datos exitosa');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos');
        
    }
}


module.exports = {
    dbConnection
}