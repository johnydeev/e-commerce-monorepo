import nodemailer, { Transporter, createTransport } from "nodemailer";
import ENVIRONMENT from "./environment.config";

const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: ENVIRONMENT.EMAIL,
        pass: ENVIRONMENT.EMAIL_KEY,
    },
});

transporter.verify((err, success) => {
    if (err) {
        console.log("Verify error", err);
    } else {
        console.log("Server is ready to take our messages", success);
    }
});

export default transporter;