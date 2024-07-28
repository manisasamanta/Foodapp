const crypto = require("crypto");
const cryptoTokenGen = () => {
    return crypto.randomBytes(64).toString("hex");
}

module.exports = cryptoTokenGen