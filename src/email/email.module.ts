import { Module } from '@nestjs/common';
// import { EmailController } from './email.controller';
import { EmailService } from './email.service';
// import { BullModule } from '@nestjs/bullmq';

@Module({
  // imports: [
  //   BullModule.forRoot({
  //     connection: { host: 'localhost', port: 6379 },
  //   }),
  //   BullModule.registerQueue({
  //     name: 'email',
  //   }),
  // ],
  // controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
