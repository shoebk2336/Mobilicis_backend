
const mongoose=require('mongoose')

const DataSchema=new mongoose.Schema(
    
        {

            id:Number,
            first_name:String,
            last_name:String,
            email:String,
            gender:String, 
            income:Number,
            city:String, 
            car:String,
            quote:String,
            phone_price:String,
        }
    
)



const Model=mongoose.model("userData",DataSchema)


module.exports={Model}