import { Queue, Worker } from 'bullmq';
import nodemailer from 'nodemailer';

const connection = {
  host: 'localhost', // Ajusta estos valores según tu configuración de Redis
  port: 6379,
};

export const emailQueue = new Queue('email', { connection });

emailQueue.add('sendEmail', {
  email: 'destinatario@example.com',
  subject: 'Alerta de Balance Negativo',
  message: 'Tu balance es ahora negativo.',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emailWorker = new Worker(
  'email',
  async (job) => {
    if (job.name === 'sendEmail') {
      const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'aff50a8ed593cb',
          pass: 'f9fdb7f4b325ab',
        },
      });

      // Envía el correo usando el transportista de nodemailer
      await transporter.sendMail({
        from: '"Mi App" <miapp@example.com>', // Emisor
        to: job.data.email, // Destinatario, especificado en el trabajo
        subject: job.data.subject, // Asunto del correo
        text: job.data.message, // Cuerpo del mensaje
        // puedes usar "html" para contenido HTML
      });
    }
  },
  { connection: { host: 'localhost', port: 6379 } },
); // Configuración de conexión a Redis
