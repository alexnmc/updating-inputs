const express = require('express')
const app = express()
const mongoose = require('mongoose')


app.use(express.json()) 

app.use("/", require("./routes/data"))




mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/hari', {useNewUrlParser: true}, () => {
    console.log('connect to the db captain!')  
})
mongoose.set('useCreateIndex', true); // stops the error message...


app.use((err, req, res, next) => {
    return res.send({errMsg: err.message})
})






app.listen(8000, () => console.log("server is running"))