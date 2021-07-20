import LoggerService from './logger';
import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL as string;
const DEFAULT_SUBJECT = 'DDLand';

class MailService {

  private logger: LoggerService;

  constructor() {
    sgMail.setApiKey(SENDGRID_API_KEY);
    this.logger = new LoggerService('Services');
  }

  async send(email: string, message: string) {
    try {
      const msg = {
        from: SENDGRID_EMAIL,
        subject: DEFAULT_SUBJECT,
        text: message,
        to: email,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      await sgMail.send(msg);
    } catch (err) {
      this.logger.log('Error trying to send the email via sendGrid', err);
      throw new Error('Error trying to send email');
    }
  }
}

export default new MailService();
