import { Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './email.interface';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('')
  async sendEmail() {
    const dto: SendEmailDto = {
      from: { name: 'Carlos', address: 'info@chargevite.com' },
      recipients: [{ name: 'John', address: 'admin@info.com' }],
      subject: 'Warning',
      html: '<p>Red numbers!</p>',
    };
    return await this.emailService.sendEmail(dto);
  }
}
