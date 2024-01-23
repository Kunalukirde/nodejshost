const mongoose = require('mongoose');

DbName = 'nodeauth';

const mongoDBconnect = async (DATABASE_URL, DbName) => {  
    try {
        await mongoose.connect(DATABASE_URL,DbName); 
        console.log('Mongo DB Connected...');   
    } catch (error) {
        console.log('Error connecting to MongoDB ... ' , error);
    }
    

}



module.exports = mongoDBconnect;