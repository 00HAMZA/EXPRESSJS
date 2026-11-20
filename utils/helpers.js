const bcrypt = require("bcrypt");

const saltRound = 10;
const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(saltRound);
    console.log("salt :", salt);
    return bcrypt.hashSync(password, salt);
}
const comparepassword = (plain, hashed) =>{
    return bcrypt.compareSync(plain, hashed);
}
module.exports = hashPassword, comparepassword;