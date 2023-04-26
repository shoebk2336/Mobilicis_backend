// const env=require('dotenv').config()

const mongoose=require('mongoose')

const connection=mongoose.connect('mongodb+srv://shoebk478:shoeb@cluster0.lcrlhc2.mongodb.net/Mobilicis?retryWrites=true&w=majority' )


module.exports={connection}