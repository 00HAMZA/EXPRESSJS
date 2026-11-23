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
const googleUsershema = mongoose.Schema({
    googleId : {type : String, unique : true, sparse : true},
    username : String,
    email : String,
    picture : String
}, {timestamps : true});


const user = mongoose.model("user", userShema);
const googleUser = mongoose.model("googleUser", googleUsershema);
module.exports = user, googleUser;