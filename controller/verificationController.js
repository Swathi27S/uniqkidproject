const nodeMailer = require("nodemailer");
const otpGenerator = require("otp-generator");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

function generateOtp() {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    return otp;
  } catch (error) {
    console.log("generateOtp error: " + error);
    throw error;
  }
}

module.exports = {
  // send email

  sendEmail: async (email) => {
    try {
      const otp = generateOtp();
      console.log("Generated OTP:", otp);

      await transporter.sendMail({
        from: process.env.APP_EMAIL,
        to: email,
        subject: "OTP Verification",
        html: `<h1>Hello, your OTP is ${otp}</h1>`,
      });

      return otp;
    } catch (error) {
      console.log("Error sending email:", error);
      throw error;
    }
  },
};
