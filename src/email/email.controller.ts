import { Controller, Post } from '@nestjs/common';
import { emailQueue } from './email.queue';

@Controller()
export class EmailController {
  @Post('/send-email')
  async sendEmailTest() {
    await emailQueue.add('sendEmail', {
      email: 'satiscopolo@gmail.com',
      subject: 'Prueba de BullMQ y Nodemailer',
      message: 'test',
    });

    return { message: 'Trabajo de envío de email encolado' };
  }
}
