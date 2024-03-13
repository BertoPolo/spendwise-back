// import { Worker } from 'bullmq';
// import { emailQueue } from './email.queue';
// import { EmailService } from './email.service';

// const emailService = new EmailService();

// const worker = new Worker(
//   emailQueue.name,
//   async (job) => {
//     console.log(`Processing job ${job.id}`);
//     try {
//       await emailService.sendNegativeBalanceEmail(job.data);
//       worker.on('completed', (job) => {
//         console.log(`Job ${job.id} has completed`);
//       });

//       console.log('Email sent successfully');
//     } catch (error) {
//       console.error('Failed to send email', error);
//       worker.on('failed', (job, err) => {
//         console.log(`Job ${job.id} has failed with error ${err.message}`);
//       });
//     }
//   },
//   {
//     connection: {
//       host: 'localhost',
//       port: 6379,
//     },
//   },
// );
