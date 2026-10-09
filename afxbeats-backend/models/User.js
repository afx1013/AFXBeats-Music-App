const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username: {type: String,required: true,unique: true},
    password: {type: String,required: true,minlength: 8}
}, {timestamps: true});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema);
module.exports = User;