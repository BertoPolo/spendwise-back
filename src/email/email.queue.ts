// import { Queue, Worker } from 'bullmq';
// import nodemailer from '@nestjs-modules/mailer';
// import nodemailer from 'nodemailer';

// const connection = {
//   host: 'localhost',
//   port: 6379,
// };

// export const emailQueue = new Queue('email', { connection });

// emailQueue.add('sendEmail', {
//   email: 'satiscopolo@gmail.com',
//   subject: 'Alerta de Balance Negativo',
//   message: 'Tu balance es ahora negativo.',
// });

// const emailWorker = new Worker(
//   'email',
//   async (job) => {
//     if (job.name === 'sendEmail') {
// const sendEmail = async (job) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//       user: 'aff50a8ed593cb',
//       pass: 'f9fdb7f4b325ab',
//     },
//   });

//   await transporter.sendMail({
//     from: '"Mi App" <miapp@example.com>',
//     to: job.data.email || 'satiscopolo@gmail.com',
//     subject: job.data.subject,
//     text: job.data.message,
//   });
// };
//     }
//   },
//   { connection: { host: 'localhost', port: 6379 } },
// );

// emailWorker.on('failed', (job, err) => {
//   console.log(`Job "${job.id}" failed with error:" ${err.message}"`);
// });
