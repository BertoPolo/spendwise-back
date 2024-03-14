import { Module } from '@nestjs/common';
import { EmailQueueService } from './emailQueue.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  providers: [EmailQueueService],
  exports: [EmailQueueService],
})
export class QueueModule {}
