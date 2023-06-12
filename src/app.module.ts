import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportDataModule } from './import-data/import-data.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    ImportDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
