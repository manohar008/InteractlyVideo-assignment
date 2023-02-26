const express=require('express')
const {createContact,getContact,updateContact,deleteContact}=require('../controller/controller')
const {createContactWithCrm,getContactWithCRM,updateContactWithCRM,deleteContactWithCMR}=require('../controller/crm')

const router=express.Router()



router.post('/contact',createContact)
router.get('/contact',getContact)
router.put('/contact',updateContact)
router.delete('/contact',deleteContact)


router.post('/createContactWithCrm',createContactWithCrm)
router.get('/getContactWithCRM',getContactWithCRM)
router.put('/updateContactWithCRM',updateContactWithCRM)
router.delete('/deleteContactWithCMR',deleteContactWithCMR)
module.exports=router