const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
    name:{
       type: String,
       unique:true,
       required:true,
       lowercase:true,
       trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    logoLink:{
        type:String,
        required:true,
        trim:true
    },
    isDeleted:Boolean,
    default:false

},{timeStamps:true})

module.exports = mongoose.model('college',collegeSchema)

