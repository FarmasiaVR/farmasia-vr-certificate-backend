const mongoose = require("mongoose")

//email parameter is the email address to which the results are sent to
//password is the parameter used to evaluate whether the POST request is approved

const certificateSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
})


module.exports = {Certificate: mongoose.model("certificate", certificateSchema), certificateSchema}

