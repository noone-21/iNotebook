const connectToMongo = require('./db.js');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express();
const port = 5000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Danish!')
  })

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook server Listening on port ${port}`)
})

