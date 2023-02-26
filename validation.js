

const mongoose=require('mongoose')


const ObjectId=(ObjectId)=>mongoose.Types.ObjectId.isValid(ObjectId)
const mobileNumber=(value)=> /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(value)
const st=(value)=> /^[a-zA-Z]+$/.test(value)
const checkEmail=(value)=>  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)


module.exports={mobileNumber,st,checkEmail,ObjectId}