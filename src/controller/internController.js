const internModel = require('../model/internModel')
const collegeModel = require('../model/collegeModel')
const {isValidString, isValid, isValidMobile, isValidEmail, isValidName } = require('../validator/validator')

const createIntern = async function (req,res){
    try{
        let{name,mobile,email,collegeName} = req.body
         let intern ={}
        if(!name){
            return res.status(400).send({status:false,msg:" name is required"} )
        }
        if(!isValid(name) || !isValidString(name)){
            return res.status(400).send({status:false,msg:"enter valid name"})
        }
        intern.name = name
        if(!mobile){
            return res.status(400).send({status:false,msg:" mobile number is rquired"})
        }
        if(!isValid(mobile) || !isValidMobile(mobile)){
            return res.status(400).send({status:false,msg:"enter valid mobile number"})
        }
        
        if(!email){
            return res.status(400).send({status:false,msg:"email id is required"})
        }
        if(!isValid(email) || !isValidEmail(email)){
            return res.status(400).send({status:false,msg:"enter valid email"})
        }
        const isDuplicate = await internModel.findOne({$or:[{email:email},{mobile:mobile}]})
        if(isDuplicate) {
            return res.status(409).send({status:false,msg:`email ${email} or mobile  number ${mobile}  already exists`})                           // conflict (409)
        }
        intern.mobile = mobile
        intern.email = email
        if(!collegeName){
            return res.status(400).send({status:false,msg:"college name is required"})
        }
        collegeName = collegeName.toLowerCase()
        if(!isValid(collegeName) ||  !isValidName(collegeName)){
            return res.status(400).send({status:false,msg:" enter valid abbrevation for college name"})
        }
        const college = await collegeModel.findOne({name:collegeName})
        if(!college){
            return res.status(404).send({status:false,msg:"no college exists with this name"})
        }
        intern.collegeId = college._id
        let savecollege = await internModel.create(intern)
            res.status(201).send({status:true,data:savecollege})
        
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}




module.exports.createIntern = createIntern