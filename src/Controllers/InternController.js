const InternModel = require("../Models/InternModel")
const CollegeModels = require("../Models/CollegeModel")

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const CreateIntern = async function (req, res) {

    const Interndata = req.body
    const { name, email, mobile, collegeId } = Interndata

    try {
        if (!isValidRequestBody(Interndata)) {
            return res.status(400).send({ msg: "please input some data" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ msg: "please input name" })
        }
        if (!isValid(mobile)) {
            return res.status(400).send({ msg: "please input mobile no." })
        }
        const ismobile = await InternModel.findOne({ mobile })
        if (ismobile) {
            return res.status(400).send({ msg: "Mobile no.  is already used" })
        }
        if (!(/^[6-9]\d{9}$/.test(mobile))) {
            return res.status(400).send({ status: false, message: `Mobile number should be a valid number` })

        }

        if (!isValid(collegeId)) {
            return res.status(400).send({ msg: "please input collegeId" })
        }
        const validId = await CollegeModels.findOne({ _id: collegeId , isDeleted:false})
        if (!validId) {
            return res.status(400).send({ msg: "college id is invalid" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ msg: "please input email" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()))) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` })

        }

        const isemail = await InternModel.findOne({ email })
        if (isemail) {
            return res.status(400).send({ msg: "email  is already used" })
        }


        const DataInterns = await InternModel.create(Interndata)
        return res.status(200).send({ Status: true, msg: "InterData sucessfully Created", data: DataInterns })



    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports.CreateIntern = CreateIntern

