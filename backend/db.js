const mongoose=require('mongoose');
const mongoURL=`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.cmeuax1.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`

const connectToMongo = () =>{
    mongoose.connect(mongoURL,()=>{
        try {
            console.log('Connected to Database successfully!')
        } catch (error) {
            console.log("Error:",error)
        }
        
    })
}

module.exports =connectToMongo;