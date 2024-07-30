const nodemailer = require("nodemailer");

const sendEmail = async ({email, subject, text}) => {
    try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.MAIL_USERNAME, 
        to: email,
        subject: subject,
        text: text,
    };
    await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}


module.exports = sendEmail