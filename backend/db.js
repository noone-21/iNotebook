const mongoose=require('mongoose');
const mongoURL=`mongodb+srv://datechscale:hesoyam.14@cluster0.cmeuax1.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0`

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