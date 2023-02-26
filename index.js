const express=require('express')
const mongoose=require('mongoose')
const route=require('./routes/route')
require('dotenv').config()

const app=express()

app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect(process.env.db,{ usenewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use("/", route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
