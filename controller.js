const { findByIdAndUpdate } = require('../model/contactModel')
const contactSchema=require('../model/contactModel')
const {mobileNumber,st,checkEmail,ObjectId}=require('../validation/validation')



// =================================== create contact ===============================================
const createContact=async (req,res)=>{
    try{

        const data=req.body

        if(!data) return res.status(404).send({status:false,message:"should be send data in body "})
        const {first_name, last_name, email, mobile_number}=data
        if(!first_name) return res.status(404).send({status:false,message:"should be send data in first_name"})
        if(!last_name) return res.status(404).send({status:false,message:"should be send data in last_name "})
        if(!email) return res.status(404).send({status:false,message:"should be send email in email "})
        if(!mobile_number) return res.status(404).send({status:false,message:"should be send  mobile number in mobile_number "})
    
        if(!st(first_name)) return res.status(400).send({status:false,message:"first_name should be in string format"})
        if(!st(last_name)) return res.status(400).send({status:false,message:"last_name should be in string format"})
        if(!checkEmail(email)) return res.status(400).send({status:false,message:"email should be in email format"})
        if(!mobileNumber(mobile_number)) return res.status(400).send({status:false,message:"mobile_number should be in indian mobile number"})

        if(await contactSchema.findOne({email})) return res.status(400).send({status:false,message:"this email already  register"})


        let createContactData=await contactSchema.create(data)

        res.status(201).send({
            status:true,
            message:'contact create successfull',
            data:createContactData
        })
    }
    catch(error){
        res.status(500).send({
            status:false,
            message:error.message
        
        })
    };

}



// =========================================================== get contact ==========================================
const getContact=async (req,res)=>{
    try{

        const data=req.body
       
        if(!data.id) return res.status(404).send({status:false,message:"please send id in body"})
        if(!ObjectId(data.id)) return res.status(400).send({status:false,message:'please send valid objectid'})
        let allData=await contactSchema.findOne({_id:data.id,isDeleted:false})
        if(!allData) return res.status(404).send({status:false,message:"there is no user with this id"})
        res.status(200).send({status:true,message:"data successful get", data:allData})
    }
    catch(error){
        res.status(500).send({
            status:false,
            message:error.message
        })
    }
}


// ========================================================== update contact ==========================================

const updateContact=async (req,res)=>{
    try{

        const data=req.body
        const {id,new_email, new_mobile_number}=data
        if(!id) return res.status(404).send({status:false,message:'please send id'})
        if(!ObjectId(id)) return res.status(400).send({status:false,message:'please send valid objectid'})

        if(!new_email && !new_mobile_number) return res.status(404).send({status:false,message:"for updation should be send at least one of new_eamil and new_mobile_number"})

       if(new_email) if(!checkEmail(new_email)) return res.status(400).send({status:false,message:"email should be in email format"})
        if( new_mobile_number) if(!mobileNumber(new_mobile_number)) return res.status(400).send({status:false,message:"mobile_number should be in indian mobile number"})
    
        let updata=await contactSchema.findByIdAndUpdate(id,{$set:{email:new_email,mobile_number:new_mobile_number}},{new:true}) 
        if(!updata || updata.isDeleted) return res.status(404).send({status:false,message:"there is no any user with this id"})
        res.status(200).send({status:true,message:'data successfully updated',newData:updata})
    }
    catch(error){
        res.status(500).send({
            status:false,
            message:error.message
        })
    }
}

//========================================== delete contact ==============================================

const deleteContact=async (req,res)=>{
    try{

        const data=req.body
       
        if(!data.id) return res.status(404).send({status:false,message:"please send id in body"})
        if(!ObjectId(data.id)) return res.status(400).send({status:false,message:'please send valid objectid'})
        let allData=await contactSchema.findOneAndUpdate({_id:data.id,isDeleted:false},{isDeleted:true})
        if(!allData) return res.status(404).send({status:false,message:"there is no user with this id"})
        res.status(200).send({status:true,message:"data successful delete"})
    }
    catch(error){
        res.status(500).send({
            status:false,
            message:error.message
        })
    }
}


module.exports={createContact,getContact,updateContact,deleteContact}