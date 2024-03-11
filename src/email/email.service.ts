import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './email.interface';

@Injectable()
export class EmailService {
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
  async sendEmail(dto: SendEmailDto) {
    const { from, recipients, subject, html, placeholderReplacements } = dto;

    const transport = this.emailTransport();

    const options = {
      from: from,
      to: recipients,
      subject: subject,
      html: html,
      placeholderReplacements: placeholderReplacements,
    };

    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
