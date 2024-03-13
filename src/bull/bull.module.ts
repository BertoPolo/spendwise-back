import { Module } from '@nestjs/common';
// import { BullModule } from '@nestjs/bullmq';

@Module({
  //   imports: [
  //     BullModule.registerQueue({
  //       name: 'queueName',
  //       connection: {
  //         host: '0.0.0.0',
  //         port: 6380,
  //       },
  //     }),
  //     BullModule.registerFlowProducer({
  //       name: 'flowProducerName',
  //       connection: {
  //         host: '0.0.0.0',
  //         port: 6380,
  //       },
  //     }),
  //   ],
  //   providers: [TestProcessor],
})
export class BullMQModule {}
