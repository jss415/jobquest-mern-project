import nodemailer from "nodemailer";
import pug from "pug";
import { htmlToText } from "html-to-text";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const html = pug.renderFile(`${__dirname}/../templates/welcome.pug`, {
    firstName: options.firstName,
    subject: options.subject,
  });

  const mailOptions = {
    from: "Admin <admin@jobquest.com>",
    to: options.email,
    subject: options.subject,
    html,
    text: htmlToText(html),
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
