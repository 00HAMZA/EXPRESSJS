const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    username : {
        type : mongoose.Schema.Types.String,
        required : true,
    },
    password : {
        type : mongoose.Schema.Types.String,
        required : true,
    } 
})


const user = mongoose.model("user", userShema);

module.exports = user;