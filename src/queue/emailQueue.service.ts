import { Injectable } from '@nestjs/common';
import Queue from 'bee-queue';
import { EmailService } from '../email/email.service';
import { SendEmailDto } from '../email/interfaces/email.interface';

@Injectable()
export class EmailQueueService {
  private emailQueue: Queue;

  constructor(private emailService: EmailService) {
    this.emailQueue = new Queue('email', {
      redis: {
        host: 'localhost',
        port: 6379,
      },
    });

    //when job is in queue, this is triggered
    this.emailQueue.process(async (job, done) => {
      try {
        await this.emailService.sendNegativeBalanceEmail(job.data);
        done();
      } catch (error) {
        console.error('Failed to process email job', job.id, error);
        done(error);
      }
    });
  }
  //add task to MQ
  addEmailJob(emailJobData: SendEmailDto) {
    this.emailQueue.createJob(emailJobData).save();
  }
}
