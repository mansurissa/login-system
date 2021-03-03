import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { signToken } from './auth';

config();
const { EMAIL, PASS, HOST, NAME } = process.env;
const sendEmail = async (type, data = {}) => {
  try {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: NAME,
        link: HOST,
      },
    });
    const token = signToken(data);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });
    const mailOptions = {
      to: `${data.email}`,
      subject: `${type}`,
      html: '',
    };
    let email = '';
    switch (type) {
      case 'verify':
        email = {
          body: {
            name: data.name,
            intro: `Welcome to ${NAME}! We're very excited to have you on board. Luck you!  `,
            action: {
              instructions: 'Click the button below to verify your Email',
              button: {
                color: '#008c52',
                text: 'Confirm your Email',
                link: `${HOST}/verify/?${token}`,
              },
            },
            outro:
              "Remember, if you don't do it this link will expire in 1day.",
          },
        };
        mailOptions.html = mailGenerator.generate(email);
        break;

      case 'comfirmation':
        email = {
          body: {
            name: data.name,
            intro: `Welcome to ${NAME}! You have successfully Verified Your email. Enjoy Unilimited Contents`,
            outro:
              "Need help, or have questions? Just reply to this email, we'd love to help.",
          },
        };

        mailOptions.html = mailGenerator.generate(email);

        break;

      case 'forgotPassword':
        email = {
          body: {
            name: data.name,
            intro: 'Your request of reseting password has been received',
            action: {
              instructions:
                'Please click the button below to reset your password',
              button: {
                color: '#008c52',
                text: 'Reset your password',
                link: `${HOST}/reset/?${data.token}`,
              },
            },
            outro:
              "Remember, if you don't do it, this link will expire in 1day.",
          },
        };
        mailOptions.html = mailGenerator.generate(email);
        break;

      case 'creator':
        email = {
          body: {
            name: data.name,
            intro: `Welcome again ${data.name}! You Are now a <h1> Content Creator</h2> of ${NAME} `,
            outro:
              "Need help, or have questions? Just reply to this email, we'd love to help you out.",
          },
        };

        mailOptions.html = mailGenerator.generate(email);

        break;
      case 'normalUser':
        email = {
          body: {
            name: data.name,
            intro: `Hi ${data.name}!, The admin changed your role. You Are now a <h1> normal User</h2> on ${NAME} `,
            outro:
              "Need help, or have questions? Just reply to this email, we'd love to help you out.",
          },
        };

        mailOptions.html = mailGenerator.generate(email);

        break;

      default:
        mailOptions.html = '';
    }
    const info = await transporter.sendMail(mailOptions);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    return console.log(error);
  }
};
export default sendEmail;
