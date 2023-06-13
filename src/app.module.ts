import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvokeController } from './invoke/invoke.controller';
import { InvokeService } from './invoke/invoke.service';
import { InvokeProducer } from './invoke/invoke.producer';
import { InvokeConsumer } from './invoke/invoke.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    BullModule.registerQueue(
      {
        name: 'notify-completion',
      },
      {
        name: 'import-data',
      },
      {
        name: 'export-data',
      },
    ),
  ],
  controllers: [AppController, InvokeController],
  providers: [AppService, InvokeService, InvokeProducer, InvokeConsumer],
})
export class AppModule {}
