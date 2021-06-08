const mailer = require('nodemailer');
const { mailConfig } = require('./config')
const { welcome } = require('./templates/welcome')
const { reset_password } = require('./templates/reset_password')
const sendMail = async (to, name, link, type, actionData = null) => {
    const transporter = mailer.createTransport(mailConfig);
    const mail = await getEmailData(to, name, link, type, actionData);//type is email template here
    transporter.sendMail(mail, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Mail successfully sent: %s', info.messageId);
        transporter.close();

    });


}

const getEmailData = (to, name, link, template, actionData) => {
    let data = null;
    switch (template) {
        case 'welcome':
            data = {
                from: `${process.env.COMPANY_NAME},<${process.env.FROM_EMAIL}>`,
                to,
                subject: `Welcome, to ${process.env.COMPANY_NAME} ${name}`,
                html: welcome(actionData),//sending mail template

            }
            break;

        case 'registration':
            data = {
                from: `${process.env.COMPANY_NAME},<${process.env.FROM_EMAIL}>`,
                to,
                subject: 'Confirm your Account',
                html: `<p>Dear, ${name} please verify your account by clicking <a href="${link}">Verify Now</a>. If you are unable to do so, copy and
                    'paste the following link into your browser:</p><p>${link}</p>`,


            }
            break;



        default:
            data;
            break;

    }
    return data;


}

module.exports = { sendMail }