const { json } = require('body-parser');
const collegeModel = require('../model/collegeModel');
const  internModel  = require('../model/internModel');

const {isValid,isValidInput,isValidName,isValidString,isValidUrl} = require('../validator/validator')

const createCollege = async (req,res) =>{
    try{
        if(!isValidInput(req.body)) // argument 
        {
           return res.status(400).send({status:false,msg:"enter validInput"})
        } 
        
        let{name,fullName,logoLink} = req.body;
        if(!name){
            return res.status(400).send({status:false,msg:"name is required"})
        }
        if(!isValid(name) ||  !isValidName(name)) return res.status(400).send({status:false,msg:"enter valid  name"})
        let college = await collegeModel.findOne({name:name})
        if(college){
            return res.status(409).send({status:false, msg:"college already exists"})
        }
        
        if(!fullName){
            return res.status(400).send({status:false,msg:"fullNAme is required"})
        }
        if(!isValid(fullName) ||!isValidString(fullName)) return res.status(400).send({status:false,msg:"enter valid fullName"})
        if(!logoLink){
            return res.status(400).send({status:false,msg:"logoLink is required"})
        }
        if(!isValid(logoLink) ||!isValidUrl(logoLink)) return res.status(400).send({status:false,msg:"enter valid logoLink"})
        let savecollege = await collegeModel.create(req.body)
        res.status(201).send({ status: true, data: savecollege })
    
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
  }
  
  // ------------------------------------------------getDetails---------------------------------------------------------//
   
  const getDetails = async function(req,res){
    try{
        if(!isValidInput(req.query)){
            return res.status(400).send({status:false,msg:"enter valid input"})
        }
         let collegeName= req.query.collegeName
         if(!collegeName){
            return res.status(400).send({status:false,msg:"enter college Name"})
         }
         if(!isValid(collegeName)  || !isValidName(collegeName)){
            return res.status(400).send({status:false,msg:"enter valid collegeName abbreviation"})
         }

         let college = await collegeModel.findOne({name:collegeName})
         if(!college){
            return res.status(404).send({status:false,msg:"no such college exixts"})
         }
         let collegeIntern = await internModel.find({collegeId:college._id}).select({_id:1 , name:1 , email:1 , mobile:1})
         college = JSON.parse(JSON.stringify(college))       // deep copy
          delete college._id
          delete college.__v
          college.interns = collegeIntern
          return res.status(200).send({status:true, data : college})
    }
    catch(err){
        res.status(500).send({status:false, msg:err.message})
    }
  }



module.exports.createCollege = createCollege
module.exports.getDetails = getDetails