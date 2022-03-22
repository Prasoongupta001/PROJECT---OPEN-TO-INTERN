const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: "College must be entered"
    },
    fullName: {
        type: String,
        unique: true,
        required: "must required this feild"
    },
    logoLink: { type:String,
         required: "logo link must be compulsary" },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model("collegedata", collegeSchema)