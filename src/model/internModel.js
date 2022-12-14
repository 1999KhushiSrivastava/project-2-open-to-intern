const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true ,
        trim:true
    },
    email:{
        type: String, 
        trim : true ,
        lowercase : true,
        required: 'Email address is required',
        uniuqe: true,
        },
    mobile:{
        type:String,
         required: "mobile no mandatory",
          uniuqe: true, 
        },
    collegeId: {
        type: ObjectId, 
        ref:"college",
      },
    isDeleted: {
        type: Boolean, 
        default: false
    }

},{timestamps: true})
   

module.exports = mongoose.model('interns', internSchema)
    
