const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
     last_name:{
        type:String,
        required:true
    },
      email:{
        type:String,
        unique:true,
        required:true
    },
       mobile_number:{
        type:Number,
        required:true
    },

    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('contact',contactSchema)