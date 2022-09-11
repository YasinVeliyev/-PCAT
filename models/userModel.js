const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: [true, "Please Enter First Name"] },
    lastname: { type: String, required: [true, "Please Enter Last Name"] },
    email: {
        type: String,
        required: [true, "Please Enter email"],
        validate: { validator: validator.isEmail, message: (props) => `${props.value} is not a valid email!` },
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: { type: String, required: [true, "Please enter a password"], minlength: 6 },
    passwordconfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not same",
        },
    },
});

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordconfirm = undefined;
    next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
