const CollegeModels = require("../Models/CollegeModel")
const InternModel = require("../Models/InternModel")


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}




const CreateCollege = async function (req, res) {
    try {
        const databody = req.body
        if (!isValidRequestBody(databody)) {
            return res.status(400).send({ status: false, msg: "please input required data " })
        }

        const { name, fullName, logoLink } = databody

        if (!isValid(name)) {
            res.status(400).send({ status: false })
        }
        if (!isValid(fullName)) {
            res.status(400).send({ status: false })
        }
        if (!isValid(logoLink)) {
            res.status(400).send({ status: false })

        }

        let xyz = await CollegeModels.findOne({ name })
        if (xyz) {
            return res.status(400).send({ msg: "College already exists" })
        }

        const final = await CollegeModels.create(databody)
        return res.status(200).send({ msg: "College data created sucessfully", data: final })



    }
    catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}


const GetDetails = async function (req, res) {

        try {

            let fix = await CollegeModels.findOne({ name: req.query.CollegeName, isDeleted : false })
            console.log(fix)
            if (!fix) {
                res.status(400).send({ status: false, msg: " No college found" })
            }
            else {
                let ID = fix._id
                let data = fix
                let interns = await InternModel.find({ collegeId: ID, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
                if (!interns.length > 0) {
                    return res.status(400).send({ status: false, msg: "No Interns applied for an internship" })
                }
                else {
                    let details = { name: data.name, fullname: data.fullName, logolink: data.logoLink, interests: interns }
                    return res.status(200).send({ status: true, data: details })
                }
            }

        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }




module.exports.CreateCollege = CreateCollege
module.exports.GetDetails = GetDetails






