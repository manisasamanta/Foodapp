const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        default: Date.now(),
        expires: 300
    },
    expired: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
otpSchema.index({ expiresIn: 1 }, { expireAfterSeconds: 300 });
module.exports = mongoose.model("OTP", otpSchema)