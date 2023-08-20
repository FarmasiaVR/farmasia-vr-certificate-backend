const mongoose = require("mongoose")

const certificateSchema = new mongoose.Schema({
    user: {
        type: String
    },
    completedTasks: [{
        taskName: {
            type: String
        },
        points: {
            type: Number
        }
    }]
})


module.exports = {Certificate: mongoose.model("certificate", certificateSchema), certificateSchema}

