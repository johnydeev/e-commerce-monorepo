import { SentMessageInfo, SendMailOptions } from 'nodemailer';
import transporter from '../../config/nodemailer.config';
import { IMailOptions } from './IMailsOptions';


const sendEmail = async ({
    to,
    subject,
    html,
}: IMailOptions): Promise<SentMessageInfo | Error> => {
    const MailOptions: SendMailOptions = {
        to,
        subject,
        html,
    };
    try {
        const data: SentMessageInfo = await transporter.sendMail(MailOptions);
        return data;
    } catch (error) {
        return error;
    }
};

export default sendEmail;