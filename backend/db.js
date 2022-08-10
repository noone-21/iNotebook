const mongoose=require('mongoose');
const mongoURI=process.env.MONGO_URL

const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log('Connected to Database successfully!')
    })
}

module.exports =connectToMongo;