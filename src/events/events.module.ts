import { Module } from '@nestjs/common';
import { MyEvents } from './events';
// import { EventsController } from './events.controller';
// import { EventsService } from './events.service';

@Module({
  // controllers: [EventsController],
  providers: [MyEvents],
})
export class EventsModule {}
