import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './email.interface';
// import { Queue } from 'bullmq';
// import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class EmailService {
  //   constructor(
  //     @InjectQueue('transcode') private readonly transcodeQueue: Queue,
  //   ) {}

  //   async transcode() {
  //     await this.transcodeQueue.add({
  //       name: 'lala',
  //     });
  //   }

  emailTransport() {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      secure: false,
      auth: {
        user: '7999798aae9053',
        pass: '0f5d5c7dc7105b',
      },
    });
    return transporter;
  }
  async sendNegativeBalanceEmail(dto: SendEmailDto) {
    const { from, recipients, subject, html } = dto;

    const transport = this.emailTransport();

    const options = {
      from: from,
      to: recipients,
      subject: subject,
      html: html,
    };

    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
